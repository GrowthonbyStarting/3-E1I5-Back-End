import { Global, Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'prisma/prisma.service';
import { UserGuard } from './user';

@Global()
@Module({
  providers: [UserGuard, JwtService, PrismaService],
  exports: [],
})
export class GuardModule {}
