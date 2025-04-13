import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum AccountType {
  LOCAL = "local",
  GOOGLE = "google",
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  username?: string;

  @Column({ nullable: true })
  password?: string;

  @Column()
  email: string

  @Column()
  name: string

  @Column({
    type: "enum",
    enum: AccountType,
    default: AccountType.LOCAL
  })
  accountType: AccountType
}
