import { Module } from '@nestjs/common';
import { TabController } from './tab.controller';
import { TabService } from './tab.service';
import { PrismaService } from '../libs/orm';

@Module({
  imports: [],
  controllers: [TabController],
  providers: [TabService, PrismaService],
})
export class TabModule {}
