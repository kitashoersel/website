import { object, string, number, nullable, array } from 'superstruct';

export const remoteImageSchema = () =>
  object({
    id: string(),
    width: number(),
    height: number(),
    placeholder: string(),
    translations: array(object({ title: string() })),
  });
