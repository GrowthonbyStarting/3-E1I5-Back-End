import { Module } from '@nestjs/common';
import { PrismaService } from 'src/libs/orm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../constants/jwtConstants';
import { JwtStrategy } from '../security/passport.jwt.strategy';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, JwtStrategy],
  imports: [
    PassportModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3h' },
    }),
  ],
})
export class UserModule {}