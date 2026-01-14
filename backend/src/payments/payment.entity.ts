import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column({ unique: true })
  txHash: string;

  @Column({ default: 0 })
  amount: number;

  @Column({ default: 'confirmed' })
  status: string;
}
