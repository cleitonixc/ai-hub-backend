export const Base64Converter = {
  toBase64: (value: string) => Buffer.from(value).toString('base64'),
  fromBase64: (value: string) => Buffer.from(value, 'base64').toString('ascii'),
};
