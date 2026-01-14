import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { ShopService } from './shop.service';

@Controller('shop')
export class ShopController {
  constructor(private readonly shop: ShopService) {}

  @Post('buy')
  async buy(
    @Body('userId') userId: number,
    @Body('item') item: string,
  ) {
    if (!userId || !item) {
      throw new BadRequestException('userId and item required');
    }

    return this.shop.buy(userId, item);
  }
}
