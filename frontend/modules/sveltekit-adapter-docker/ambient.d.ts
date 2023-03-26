declare module 'ENV' {
  export function env<T>(key: string, fallback?: T): string | T;
}

declare module 'HANDLER' {
  export const handler: (req: any, res: any) => Promise<void>;
}

declare module 'MANIFEST' {
  import { SSRManifest } from '@sveltejs/kit';

  export const manifest: SSRManifest;
}

declare module 'SERVER' {
  export { Server } from '@sveltejs/kit';
}
