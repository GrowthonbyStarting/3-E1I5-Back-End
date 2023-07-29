import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class RegisterProfileDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsOptional()
  readonly description: string;

  @IsString()
  @IsNotEmpty()
  readonly url: string;
}
