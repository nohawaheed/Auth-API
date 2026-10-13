import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'noha@example.com',
    description: 'Unique email address',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'ExamplePass@123',
    description: 'Account password. Must be at least 8 characters long.',
    minLength: 8,
  })
  @IsString()
  @MinLength(8)
  password: string;
}
