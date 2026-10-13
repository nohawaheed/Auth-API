import { LoginResponseDto, RegisterResponseDto } from './auth-response.dto.js';

describe('LoginResponseDto', () => {
  it('should be defined', () => {
    expect(new LoginResponseDto()).toBeDefined();
  });
});

describe('RegisterResponseDto', () => {
  it('should be defined', () => {
    expect(new RegisterResponseDto()).toBeDefined();
  });
});
