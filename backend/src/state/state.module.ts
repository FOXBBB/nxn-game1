import { Module } from "@nestjs/common";
import { StateService } from "./state.service";
import { StateController } from "./state.controller";
import { UsersModule } from "../users/users.module";

@Module({
  imports: [UsersModule],
  providers: [StateService],
  controllers: [StateController],
})
export class StateModule {}
