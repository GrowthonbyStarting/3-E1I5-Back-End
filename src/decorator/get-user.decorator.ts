// eslint-disable-next-line import/no-extraneous-dependencies
import { User } from '@prisma/client';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator((data, ctx: ExecutionContext): User => {
  const req = ctx.switchToHttp().getRequest();

  return req.user;
});
