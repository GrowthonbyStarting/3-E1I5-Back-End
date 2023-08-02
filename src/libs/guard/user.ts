import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../orm';
import { unauthorized } from '../exception/exceptions';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private jwtService: JwtService, private prisma: PrismaService) {}

  // eslint-disable-next-line class-methods-use-this
  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();

    const { accessToken } = req.header.authorization;
    if (accessToken) {
      try {
        const [type, token] = accessToken.split(' ');
        if (type !== 'Bearer') {
          throw unauthorized(`Token type(${type}) is not 'Bearer'`, { errorMessage: '토큰 타입이 잘못 되었습니다.' });
        }
        const { id } = await this.jwtService.verifyAsync(token, { secret: process.env.JWT_SECRET });
        const user = await this.prisma.user.findUnique({ where: { id } });
        req.status = { user };
        return true;
      } catch (err) {
        console.error(err);
      }
    }
    req.status = {};
    return true;
  }
}
