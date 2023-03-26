import 'SHIMS';
import { env } from 'ENV';
import { Server } from 'SERVER';
import { IncomingHttpHeaders } from 'http';
import { getRequest, setResponse } from '@sveltejs/kit/node';
import { manifest } from 'MANIFEST';
import { onRequestAsyncHookHandler } from 'fastify';

type HttpException = {
  status: number;
};

const server = new Server(manifest);
await server.init({ env: process.env });

const protocolHeader = env('PROTOCOL_HEADER', '').toLowerCase();
const hostHeader = env('HOST_HEADER', 'host').toLowerCase();
const bodySizeLimit = parseInt(env('BODY_SIZE_LIMIT', '524288'), 10);
const addressHeader = env('ADDRESS_HEADER', '').toLowerCase();
const xffDepth = parseInt(env('XFF_DEPTH', '1'), 10);
const origin = env('ORIGIN', undefined);

const getOrigin = (headers: IncomingHttpHeaders) => {
  const protocol = (protocolHeader && (headers[protocolHeader] as string)) || 'https';
  const host = headers[hostHeader] as string;
  return `${protocol}://${host}`;
};

export const handler: onRequestAsyncHookHandler = async (req, reply) => {
  let request: Request | undefined;

  try {
    request = await getRequest({
      base: origin || getOrigin(req.headers),
      request: req.raw,
      bodySizeLimit,
    });
  } catch (err) {
    console.log(err);
    reply.statusCode = (err as HttpException).status ?? 400;
    return reply.send('Invalid request body');
  }

  if (addressHeader && !(addressHeader in req.headers)) {
    throw new Error(`Address header was specified with ADDRESS_HEADER=${addressHeader} but is absent from request`);
  }

  return setResponse(
    reply.raw,
    await server.respond(request, {
      platform: { req },
      getClientAddress: () => {
        if (addressHeader) {
          const value = (req.headers[addressHeader] as string) || '';

          if (addressHeader === 'x-forwarded-for') {
            const addresses = value.split(',');

            if (xffDepth < 1) {
              throw new Error(`XFF_DEPTH must be a positive integer`);
            }

            if (xffDepth > addresses.length) {
              throw new Error(`XFF_DEPTH is ${xffDepth}, but only found ${addresses.length} addresses`);
            }

            return addresses[addresses.length - xffDepth].trim();
          }

          return value;
        }

        return req.connection?.remoteAddress || req.socket?.remoteAddress;
      },
    })
  );
};
