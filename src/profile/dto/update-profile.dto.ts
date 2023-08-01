import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsIn, IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator';

const tabType = ['exp', 'skill', 'advantage', 'project', 'text', 'link'];
type TabType = (typeof tabType)[number];

class TabDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '경험', description: 'tab 제목', required: true })
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'exp', description: 'tab type', required: true, enum: tabType })
  @IsIn(tabType)
  type: TabType;

  @IsObject()
  @IsNotEmpty()
  @ApiProperty({
    example: {
      start: '2023-01-01',
      end: '2023-08-01',
      description: '숨쉬기',
    },
    description: 'tab info',
    required: true,
  })
  info: Record<string, any>;
}

export class UpdateProfileBodyDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'wity', description: '이름', required: false })
  name?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'this is wity', description: '자기소개', required: false })
  description?: string;

  @IsArray()
  @ApiProperty({
    example: [
      {
        title: '경험',
        type: 'exp',
        info: {
          start: '2023-01-01',
          end: '2023-08-01',
          description: '숨쉬기',
        },
      },
    ],
    description: '자기소개',
    required: false,
  })
  @IsOptional()
  tabs?: TabDto[];
}

export class UpdateProfileParamDto {
  @IsString()
  @ApiProperty({ example: '1', description: 'profile id', required: true })
  id: string;
}
