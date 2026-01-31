import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'bigint', unique: true })
  telegramId!: string;

  @Column({ default: 0 })
  balance!: number;

  @Column({ default: 1 })
  tapPower!: number;

  @Column({ default: 0 })
  totalTaps!: number;

  @Column({ default: 0 })
  energy!: number;

  @Column({ default: 100 })
  energyMax!: number;

  @Column({ type: 'bigint', default: () => Date.now().toString() })
  lastSeen!: number;
}
