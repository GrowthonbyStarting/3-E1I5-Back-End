import { Module } from '@nestjs/common';
import { ProfileController } from '../controllers';
import { ProfileService } from '../services';
import { PrismaService } from '../libs/orm';

@Module({
  imports: [],
  controllers: [ProfileController],
  providers: [ProfileService, PrismaService],
})
export class ProfileModule {}
