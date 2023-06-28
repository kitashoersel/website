import { createClient } from 'redis';
import { env } from '$env/dynamic/private';

type RedisClient = ReturnType<typeof createClient>;

export const redis: { client: RedisClient; isConnected: () => boolean } = {
  client: createClient({ url: env.REDIS_URL }),
  isConnected: () => false,
};

redis.client.on('ready', () => {
  redis.isConnected = () => true;
});

redis.client.on('error', () => {
  redis.isConnected = () => false;
});

redis.client.connect();
