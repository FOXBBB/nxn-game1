import { Controller, Post, Body } from "@nestjs/common";
import { TapShopService } from "./tap-shop.service";

@Controller("shop")
export class TapShopController {
  constructor(private shop: TapShopService) {}

  @Post("buy")
  buy(@Body() body: { userId: number; item: string }) {
    return this.shop.buy(body.userId, body.item);
  }
}
