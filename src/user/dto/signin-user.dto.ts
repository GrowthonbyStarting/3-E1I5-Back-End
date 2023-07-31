import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SignInDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: '1111@email.com', description: '이메일', required: true })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: '1234abcd#', description: '비밀번호 입력', required: true })
  password: string;
}
