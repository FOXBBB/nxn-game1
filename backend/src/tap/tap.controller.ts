import { Controller, Post, Param } from '@nestjs/common';
import { TapService } from './tap.service';

@Controller('tap')
export class TapController {
  constructor(private readonly tapService: TapService) {}

  @Post(':telegramId')
  tap(@Param('telegramId') telegramId: string) {
    return this.tapService.tapByTelegramId(Number(telegramId));
  }
}
