import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class UpdateProfileBodyDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'wity', description: '이름', required: false })
  name?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'this is wity', description: '자기소개', required: false })
  description?: string;

  @IsOptional()
  imageToUpload?: Express.Multer.File[];
}

export class UpdateProfileParamDto {
  @IsString()
  @ApiProperty({ example: '1', description: 'profile id', required: true })
  id: string;
}
