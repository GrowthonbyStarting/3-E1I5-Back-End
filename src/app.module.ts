import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ProfileModule } from './profile';
import { GuardModule } from './libs/guard';
import { TabModule } from './tab/tab.module';
import { S3Module } from './s3/s3.module';

@Module({
  imports: [UserModule, ProfileModule, GuardModule, TabModule, PrismaModule, S3Module],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
