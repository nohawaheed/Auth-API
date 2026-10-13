import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEmail, IsInt, IsString, Matches, Max, MaxLength, Min, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    example: 'Noha',
    description: 'First name',
    minLength: 3,
    maxLength: 10,
  })
  @IsString()
  @MinLength(3)
  @MaxLength(10)
  first_name: string;

  @ApiProperty({
    example: 'Waheed',
    description: 'Last name',
    minLength: 3,
    maxLength: 10,
  })
  @IsString()
  @MinLength(3)
  @MaxLength(10)
  last_name: string;

  @ApiProperty({
    example: 25,
    description: 'Age must be between 16 and 80',
    minimum: 16,
    maximum: 80,
  })
  @Type(() => Number)
  @IsInt()
  @Min(16)
  @Max(80)
  age: number;

  @ApiProperty({
    example: 'noha@example.com',
    description: 'Unique email address',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'ExamplePass@123',
    description: 'At least 8 characters, including a letter and a special character',
    minLength: 8,
  })
  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*[A-Za-z])(?=.*[@$!%*#?&^_-]).{8,}$/)
  password: string;
}
