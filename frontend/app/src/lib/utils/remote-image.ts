export const remoteImageToBuffer = async (url: string) => Buffer.from(await (await fetch(url)).arrayBuffer());

export const bufferToImageData = (buffer: Buffer) => `data:image/webp;base64,${buffer.toString('base64')}`;

export const remoteImageToImageData = async (url: string) => bufferToImageData(await remoteImageToBuffer(url));
