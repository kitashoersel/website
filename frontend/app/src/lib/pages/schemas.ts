import { object, string, number, nullable } from 'superstruct';

export const remoteImageSchema = () =>
  object({
    width: number(),
    height: number(),
    id: string(),
    title: nullable(string()),
  });
