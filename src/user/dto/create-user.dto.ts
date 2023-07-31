import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  @ApiProperty({ example: '1114@email.com', description: '이메일', required: true })
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8, { message: '비밀번호는 최소 8자 이상이어야 합니다.' })
  @Matches(/^(?=.*[a-z])(?=.*\d)[a-z\d@$!%*?&]+$/, {
    message: '소문자, 특수문자 및 숫자를 포함해야 합니다.',
  })
  @Matches('password')
  @ApiProperty({ example: 'abcd1234#', description: '비밀번호', required: true })
  password: string;

  @IsNotEmpty()
  @Matches('password')
  @ApiProperty({
    example: 'abcd1234#',
    description: '비밀번호 확인',
    required: true,
  })
  confirmPassword: string;
}
