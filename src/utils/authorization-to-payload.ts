import { Base64Converter } from "./base-64-converter";
import { LoginPayloadDto } from "../auth/dtos/loginPayload.dto";

export const AuthorizationToPayload = {
  toPayload: (authorization: string): LoginPayloadDto | undefined => {
    const token = authorization.split('.');

    if (!authorization[1] || token.length < 3) {
      return undefined;
    }

    return JSON.parse(Base64Converter.fromBase64(token[1]));
  },
};
