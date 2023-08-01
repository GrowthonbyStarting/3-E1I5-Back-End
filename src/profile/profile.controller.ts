import { Body, Controller, Param, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProfileService } from './profile.service';
import { UpdateProfileBodyDto } from './dto';

@Controller('/profiles')
@ApiTags('Profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Patch('/:id')
  async update(@Body() body: UpdateProfileBodyDto, @Param('id') id: string) {
    return this.profileService.update({ id: Number(id), data: body });
  }
}
