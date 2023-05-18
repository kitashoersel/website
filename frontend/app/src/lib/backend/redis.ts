import { createClient } from 'redis';
import { env } from '$env/dynamic/private';

export const redis = createClient({ url: env.REDIS_URL });
await redis.connect();
