import { Module } from '@nestjs/common';
import { AppController } from './controllers';
import { AppService } from './services';
import { ProfileModule } from './modules';
import { UserModule } from './user/user.module';

@Module({
  imports: [ProfileModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
