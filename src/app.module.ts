import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ProfileModule } from './profile';
import { GuardModule } from './libs/guard';

@Module({
  imports: [UserModule, ProfileModule, GuardModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
