import { Module } from "@nestjs/common";
import { UsersModule } from "../users/users.module";
import { TapShopService } from "./tap-shop.service";
import { TapShopController } from "./tap-shop.controller";

@Module({
  imports: [UsersModule],
  providers: [TapShopService],
  controllers: [TapShopController],
})
export class TapModule {}
