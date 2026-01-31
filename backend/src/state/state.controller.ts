import { Controller, Get, Param } from '@nestjs/common'
import { StateService } from './state.service'

@Controller('api/state')
export class StateController {
  constructor(private readonly stateService: StateService) {}

  @Get(':telegramId')
  getState(@Param('telegramId') telegramId: string) {
    return this.stateService.getState(telegramId)
  }
}
