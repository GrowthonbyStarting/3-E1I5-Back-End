import { Module } from '@nestjs/common';
import { AppController } from './controllers';
import { AppService } from './services';
import { ProfileModule } from './modules';

@Module({
  imports: [ProfileModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
