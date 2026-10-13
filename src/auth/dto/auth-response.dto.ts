import { ApiProperty } from '@nestjs/swagger';

export class RegisterResponseDto {
  @ApiProperty({
    example: 'success',
    description: 'Indicates successful registration.',
  })
  message: string;
}

export class LoginResponseDto {
  @ApiProperty({
    example: 'success',
    description: 'Indicates successful login.',
  })
  message: string;

  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    description: 'JWT access token to use for authenticated requests.',
  })
  token: string;
}
