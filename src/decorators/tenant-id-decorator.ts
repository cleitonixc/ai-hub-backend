import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthorizationToPayload } from '../utils/authorization-to-payload';

export const TenantId = createParamDecorator((
  data: unknown,
  ctx: ExecutionContext
) => {

  const request = ctx.switchToHttp().getRequest();

  const loginPayload = AuthorizationToPayload.toPayload(request.headers.authorization);

  return loginPayload?.tenants;
});
