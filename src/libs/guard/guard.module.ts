import { Global, Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserGuard } from './user';
import { PrismaService } from '../orm';

@Global()
@Module({
  providers: [UserGuard, JwtService, PrismaService],
  exports: [],
})
export class GuardModule {}
