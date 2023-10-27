import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateRolDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly slug: string;

  @IsString()
  @IsOptional()
  readonly description?: string;

  @IsBoolean()
  readonly status: boolean;
}
