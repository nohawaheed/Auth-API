import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getInfo(): { name: string; description: string; status: string; documentation: string } {
    return {
      name: 'Auth API',
      description: 'API for user registration and authentication.',
      status: 'running',
      documentation: '/docs',
    };
  }
}
