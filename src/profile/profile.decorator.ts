import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
export const profileVerification = createParamDecorator(
  async (token: string, ctx: ExecutionContext) => {
    const profileAccount = await jwt.verify(token, process.env.SECRET)
    return profileAccount
  },
);
