import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/libs/orm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import { SignInDto } from './dto/signin-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async create(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) throw new BadRequestException(`User(${email}) is exist.`);

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

    if (!validatePassword) {
      throw new BadRequestException({ message: '비밀번호를 확인해 주세요' });
    }
    const payload = { id: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
