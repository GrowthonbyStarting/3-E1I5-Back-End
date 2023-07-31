import { Controller, Post, Body } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { SignInDto } from './dto/signin-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('api/sign-up')
  @ApiOperation({ summary: '회원가입생성 API', description: '회원가입' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('api/login')
  @ApiOperation({ summary: '로그인 API', description: '로그인' })
  login(@Body() signInDto: SignInDto) {
    return this.userService.login(signInDto);
  }
}
