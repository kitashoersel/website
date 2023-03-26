import fastify from 'fastify';
import fastifyHelmet from '@fastify/helmet';
import fastifyCors from '@fastify/cors';

import { handler } from 'HANDLER';
import { env } from 'ENV';

export const host = env('HOST', '0.0.0.0');
export const port = parseInt(env('PORT', '3000'), 10);

const server = fastify({ logger: true });

const bootstrap = async () => {
  server.removeAllContentTypeParsers();
  server.addContentTypeParser('*', (_, __, done) => done(null, null));

  await server.register(fastifyCors);
  await server.register(fastifyHelmet, {
    contentSecurityPolicy: { directives: { scriptSrc: ["'self'", "'unsafe-inline'"] } },
  });

  server.get('/check', async (_, res) => {
    return res.status(200).send('Hello World');
  });

  server.get('*', (req, res) => handler(req, res));

  await server.listen({ port, host });
  console.log(`listening on ${host}:${port}`);
};

bootstrap().catch((err) => {
  console.log(err);
  process.exit(1);
});

export { server };
