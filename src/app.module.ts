import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfileModule } from './profile';

@Module({
  imports: [ProfileModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
