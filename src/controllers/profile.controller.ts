import { Body, Controller, Post, Req } from '@nestjs/common';
import { ProfileService } from '../services/profile.service';
import { RegisterProfileDto } from '../dto';

@Controller('/profiles')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post('/')
  async register(@Req() req: Request, @Body() body: RegisterProfileDto) {
    // TODO: auth guard에서 req.state.userId를 넣어준다.
    // const { userId } = req.state;
    const userId = 1;

    return this.profileService.register({ userId, data: body });
  }
}
