import { Module } from '@nestjs/common';
import { AppController } from './controllers';
import { AppService } from './services';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
