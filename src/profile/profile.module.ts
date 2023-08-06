import { Module } from '@nestjs/common';
import { ImagesService } from 'src/image/images.service';
// import { ImagesService } from 'src/common/images/images.service';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';

@Module({
  imports: [],
  controllers: [ProfileController],
  providers: [ProfileService, ImagesService],
})
export class ProfileModule {}
