import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'bigint', unique: true })
  telegramId!: string;

  // валюты
  @Column({ default: 0 })
  balance!: number;

  @Column({ default: 0 })
  balanceNxn!: number;

  // тапалка
  @Column({ default: 1 })
  tapPower!: number;

  @Column({ default: 0 })
  totalTaps!: number;

  // энергия
  @Column({ default: 100 })
  energy!: number;

  @Column({ default: 100 })
  energyMax!: number;

  // бонусы
  @Column({ default: 0 })
  tapBonus!: number;

  @Column({ type: 'integer', nullable: true })
  tapBonusExpires!: number | null;

  @Column({ default: 0 })
  energyBonus!: number;

  @Column({ type: 'integer', nullable: true })
  energyBonusExpires!: number | null;

  // автокликер
  @Column({ default: false })
  autoClicker!: boolean;

  @Column({ type: 'integer', nullable: true })
  autoClickerExpires!: number | null;

  @Column({ type: "bigint", default: 0 })
  lastOnline!: number;

  // ✅ ВАЖНО ДЛЯ ОФФЛАЙН ДОХОДА
  @Column({ type: "bigint", default: () => Date.now().toString() })
  lastSeen!: number;

  @Column({ default: 0 })
  offlineIncome!: number;
    // ⬇️ ДОБАВЬ В КОНЕЦ (или рядом с lastSeen)
  @Column({ type: 'bigint', nullable: true })
  lastEnergyUpdate!: number | null;


 
}
