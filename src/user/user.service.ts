import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'prisma/prisma.service';
import { badRequest } from '../libs/exception/exceptions';
import { CreateUserDto } from './dto/create-user.dto';
import { SignInDto } from './dto/signin-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async create(createUserDto: CreateUserDto) {
    await this.prisma.$transaction(async (prisma) => {
      const { email, password, url } = createUserDto;
      const existingUser = await this.prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) throw badRequest(`User(${email}) is exist.`);

      const SALT = Number(process.env.SALT);
      const hashedPassword = await bcrypt.hash(password, SALT);

      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
        },
      });
      await prisma.profile.create({
        data: { url, userId: user.id },
      });
    });
    return { result: '회원가입 성공' };
  }

  async login(signInDto: SignInDto) {
    const { email, password } = signInDto;

    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user)
      throw badRequest(`user(${email}) is not exist.`, {
        errorMessage: '이메일이나 비밀번호를 확인해주세요.',
      });

    const validatePassword = await bcrypt.compare(password, user.password);

    if (!validatePassword) {
      throw badRequest(`password(${password}) is not equal.`, {
        errorMessage: '이메일이나 비밀번호를 확인해주세요.',
      });
    }
    const payload = { id: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
