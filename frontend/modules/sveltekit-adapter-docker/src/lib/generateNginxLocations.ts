import { globbySync as globby } from 'globby';

type ImmutablePayload = {
  immutableFiles?: string[];
  immutableFolders?: string[];
};

type GeneratorPayload = {
  hostName: string;
  hostPort: number;
  nginxPort: number;
  languages?: string[] | undefined;
  immutables?: ImmutablePayload | undefined;
};

const getPrerenderLocations = (buildDir: string, languages: string[] = ['']) => {
  const routes = globby(
    languages.map((lang) => `${lang}/**`),
    {
      onlyDirectories: true,
      cwd: `${buildDir}/prerendered/`,
    }
  ).map((path) => `/${path}`);

  const trailingSlashRoutes = routes.map((route) => `${route}/`);
  const dataRoutes = routes.map((route) => `${route}/__data.json`);

  return [...routes, ...dataRoutes, ...trailingSlashRoutes];
};

const getClientAssetLocations = (buildDir: string, immutables: string[] = []) => {
  return globby(['**'], {
    cwd: `${buildDir}/client/`,
    ignore: [...immutables, '**/immutable', '**/*.gz', '**/*.br'],
  }).map((path) => `/${path}`);
};

const getImmutableAssetLocations = (
  buildDir: string,
  { immutableFiles = [], immutableFolders = [] }: ImmutablePayload = {}
) => {
  const immutableFilePaths = globby([...immutableFiles], {
    cwd: `${buildDir}/client/`,
    ignore: ['**/*.gz', '**/*.br'],
  }).map((path) => `/${path}`);

  const immutableFolderPaths = globby('**/immutable', {
    cwd: `${buildDir}/client/`,
    onlyDirectories: true,
    ignore: ['**/*.gz', '**/*.br'],
  }).map((path) => `/${path}`);

  return [...immutableFilePaths, ...immutableFolderPaths, ...immutableFolders.map((path) => `/${path}`)];
};

export const generateLocations = (
  buildDir: string,
  { languages, immutables, hostName, hostPort, nginxPort }: GeneratorPayload
) => {
  const prerenderLocations = getPrerenderLocations(buildDir, languages)
    .map((location) => `    location = ${location} { include /etc/nginx/fragments/prerender.conf; }`)
    .join('\n');

  const clientAssetLocations = getClientAssetLocations(buildDir, [
    ...(immutables.immutableFiles ?? []),
    ...(immutables.immutableFolders ?? []),
  ])
    .map((location) => `    location = ${location} { include /etc/nginx/fragments/client_assets.conf; }`)
    .join('\n');

  const immutableAssetLocations = getImmutableAssetLocations(buildDir, immutables)
    .map((location) => `    location ${location} { include /etc/nginx/fragments/immutable_assets.conf; }`)
    .join('\n');

  const template = `
  upstream production_server {
    server {{ host_name }}:{{ host_port }};
  }

  server {
    listen [::]:{{ nginx_port }};
    listen {{ nginx_port }};

    # The host name to respond to
    server_name _;

    # Include the basic config set
    include mixins/basic.conf;

    # Serve prerendered pages
    {{ prerender }}

    # Serve client assets
    {{ client_assets }}

    # Serve immutable assets
    {{ immutable_assets }}

    # All other traffic is passed to sveltekit
    location / {
      proxy_pass http://production_server/;
    }
  }
  `;

  return template
    .replaceAll('{{ prerender }}', prerenderLocations)
    .replaceAll('{{ client_assets }}', clientAssetLocations)
    .replaceAll('{{ immutable_assets }}', immutableAssetLocations)
    .replaceAll('{{ host_name }}', hostName)
    .replaceAll('{{ host_port }}', hostPort.toString())
    .replaceAll('{{ nginx_port }}', nginxPort.toString());
};
