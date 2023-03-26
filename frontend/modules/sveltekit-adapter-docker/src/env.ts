export const env = <T>(name: string, fallback: T) => (name in process.env ? process.env[name] : fallback);
