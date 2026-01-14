import { Controller, Get } from "@nestjs/common";
import { LeaderboardService } from "./leaderboard.service";

@Controller("leaderboard")
export class LeaderboardController {
  constructor(private readonly leaderboard: LeaderboardService) {}

  @Get("top")
  getTop() {
    return this.leaderboard.getTop10();
  }
}
