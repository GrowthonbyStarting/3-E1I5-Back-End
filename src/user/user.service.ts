import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/libs/orm';
// eslint-disable-next-line import/no-extraneous-dependencies
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Payload } from '../security/payload.interface';
import { CreateUserDto, SignInDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async create(createUserDto: CreateUserDto) {
    const { email, password, confirmPassword } = createUserDto;
    const isExist = await this.prisma.user.findUnique({
      where: { email },
    });

    if (isExist) throw new BadRequestException(`Existing user`);
    if (password !== confirmPassword) throw new BadRequestException(`비밀번호를 확인해주세요`);

    function checkPassword(password) {
      const regExp = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;

      if (!regExp.test(password)) {
        return false;
      }
      return true;
    }

    const check = checkPassword(password);
    if (check === false) {
      return `숫자, 영문, 특수문자를 포함한 8-15자리 문자열을 입력해주세요`;
    }

    const hashedPassword = await bcrypt.hash(password, 5);

    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
    return { result: '회원가입 성공' };
  }

  async login(signInDto: SignInDto) {
    const { email, password } = signInDto;

    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) throw new BadRequestException();

    const validatePassword = await bcrypt.compare(password, user.password);

    if (!email || !validatePassword) {
      throw new BadRequestException();
    }
    const payload = { username: user.email, sub: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async tokenValidateUser(payload: Payload) {
    const user = await this.prisma.user.findFirst({
      where: { email: payload.email },
    });
    return user;
  }
}
