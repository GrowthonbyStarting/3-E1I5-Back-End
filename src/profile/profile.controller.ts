import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProfileService } from './profile.service';
import { UpdateProfileBodyDto } from './dto';
import { UserGuard } from '../libs/guard';

@Controller('/profiles')
@ApiTags('Profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Patch('/:id')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: '프로필 업데이트 API', description: '프로필, 탭을 업데이트한다.' })
  async update(@Body() body: UpdateProfileBodyDto, @Param('id') id: string, @UploadedFile() file: Express.Multer.File) {
    return this.profileService.update({ id: Number(id), data: body, file });
  }

  @Get('/:url')
  @UseGuards(UserGuard)
  async retrieve(@Req() req: Request, @Param('url') url: string) {
    // const userId = req.body.user?.id;
    // console.log(req);
    const profile = await this.profileService.retrieve({ url });
    return {
      profile,
      // isMine: profile.userId === userId,
    };
  }
}
