import { Controller, Get, Param } from "@nestjs/common";
import { StateService } from "./state.service";

@Controller("state")
export class StateController {
  constructor(private state: StateService) {}

  @Get(":telegramId")
  async getState(@Param("telegramId") telegramId: string) {
    return this.state.getState(Number(telegramId));
  }
}
