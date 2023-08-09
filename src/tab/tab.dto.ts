import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator';

const tabType = ['exp', 'skill', 'advantage', 'project', 'text', 'link'];
type TabType = (typeof tabType)[number];

export class TabDto {
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
    example: [
      {
        start: '2023-01-01',
        end: '2023-08-01',
        description: '숨쉬기',
      },
    ],
    description: 'tab info',
    required: true,
  })
  info: Record<string, any>;

  @IsOptional()
  imageToUpload?: Express.Multer.File[];
}
