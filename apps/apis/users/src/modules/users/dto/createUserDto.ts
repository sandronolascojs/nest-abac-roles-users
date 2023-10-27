import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsEmail()
  readonly email: string;

  @IsString()
  name: string;

  @IsString()
  readonly lastName: string;

  @IsString()
  @IsOptional()
  readonly phone: string;

  @IsString()
  password: string;
}
