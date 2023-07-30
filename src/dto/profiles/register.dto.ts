import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class RegisterProfileDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '위티', description: '이름', required: true })
  readonly name: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: '자신을 간단하게 소개해봐요.', description: '자기소개', required: false })
  readonly description: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'https://www.naver.com', description: '자신의 위티 프로필 url 링크', required: true })
  readonly url: string;
}
