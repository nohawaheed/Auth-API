import { Type } from 'class-transformer';
import { IsEmail, IsInt, IsString, Matches, Max, MaxLength, Min, MinLength } from 'class-validator';

export class RegisterDto {
  @IsString()
  @MinLength(3)
  @MaxLength(10)
  first_name: string;

  @IsString()
  @MinLength(3)
  @MaxLength(10)
  last_name: string;

  @Type(() => Number)
  @IsInt()
  @Min(16)
  @Max(80)
  age: number;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*[A-Za-z])(?=.*[@$!%*#?&^_-]).{8,}$/)
  password: string;
}
