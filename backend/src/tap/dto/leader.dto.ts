export class LeaderUserDto {
  id!: number;
  nickname!: string;
  balanceNxn!: number;
}

export class LeaderboardDto {
  top!: LeaderUserDto[];
  me!: LeaderUserDto;
}