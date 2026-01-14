import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  async validate(login: string, password: string) {
    // временная заглушка
    return {
      id: 1,
      login,
    };
  }

  async login(user: any) {
    return {
      ok: true,
      user,
    };
  }

  async register(login: string, password: string) {
    return {
      id: Date.now(),
      login,
    };
  }
}
