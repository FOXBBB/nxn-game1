// DTO для ответов TAP и Leaderboard

export type TapResult = {
  id: number;
  nickname: string;
  balanceNxn: number;
};

export class TapResponseDto {
  id!: number;
  login!: string;
  nickname!: string;
  balanceNxn!: number;
  energy!: number;
}
