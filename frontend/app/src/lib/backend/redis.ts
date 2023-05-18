import { createClient } from 'redis';
import { env } from '$env/dynamic/private';

type RedisClient = ReturnType<typeof createClient>;

export const redis: { client: RedisClient; isConnected: () => boolean } = {
  client: createClient({ url: env.REDIS_URL }),
  isConnected: () => false,
};

redis.client.on('ready', () => {
  console.log('redis connected');
  redis.isConnected = () => true;
});

redis.client.on('error', () => {
  console.log('redis disconnected');
  redis.isConnected = () => false;
});

redis.client.connect();
