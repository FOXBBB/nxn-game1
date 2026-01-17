import { Controller, Post, Param } from '@nestjs/common';

@Controller('tap')
export class TapController {
  @Post(':telegramId')
  tap(@Param('telegramId') telegramId: string) {
    console.log('TAP FROM:', telegramId);

    return {
      ok: true,
      telegramId,
      balance: 1,
    };
  }
}
