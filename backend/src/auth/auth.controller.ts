import { Controller, Post, Body } from '@nestjs/common'
import { AuthService } from './auth.service'

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('telegram')
  authTelegram(@Body('telegramId') telegramId: string) {
    return this.authService.authTelegram(telegramId)
  }
}
