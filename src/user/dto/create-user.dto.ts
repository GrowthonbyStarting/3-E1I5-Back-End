import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8, { message: '비밀번호는 최소 8자 이상이어야 합니다.' })
  @Matches(/^(?=.*[a-z])(?=.*\d)[a-z\d@$!%*?&]+$/, {
    message: '소문자, 특수문자 및 숫자를 포함해야 합니다.',
  })
  password: string;

  @IsNotEmpty()
  confirmPassword: string;
}
