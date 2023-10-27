import { IsEmail, IsOptional, IsString } from 'class-validator';

// create for me update user dto using class validator
export class UpdateUserDto {
  @IsString()
  @IsEmail()
  @IsOptional()
  readonly email: string;

  @IsString()
  @IsOptional()
  readonly name: string;

  @IsString()
  @IsOptional()
  readonly lastName: string;

  @IsString()
  @IsOptional()
  readonly phone: string;

  @IsString()
  @IsOptional()
  readonly status: boolean;
}
