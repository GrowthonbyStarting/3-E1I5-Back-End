// eslint-disable-next-line import/no-extraneous-dependencies
import { User } from '@prisma/client';
import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/decorator/get-user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { SignInDto } from './dto/signin-user.dto';

@Controller('users')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('sign-up')
  @ApiOperation({ summary: '회원가입생성 API', description: '회원가입' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('sign-in')
  @ApiOperation({ summary: '로그인 API', description: '로그인' })
  login(@Body() signInDto: SignInDto) {
    return this.userService.login(signInDto);
  }

  // eslint-disable-next-line class-methods-use-this
  @Get('')
  @UseGuards(AuthGuard('jwt'))
  find(@GetUser() user: User) {
    return this.userService.find(user);
  }
}
