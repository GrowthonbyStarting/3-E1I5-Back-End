import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { PrismaService } from 'src/libs/orm';
import { Payload } from './payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: process.env.JWT_CINSTANTS,
    });
  }

  async validate(payload: Payload, done: VerifiedCallback): Promise<any> {
    const user = await this.prisma.user.findFirst({ where: { id: payload.id } });
    if (!user) {
      return done(new UnauthorizedException({ message: 'user does not exist' }), false);
    }
    delete user.password;
    return done(null, user);
  }
}
