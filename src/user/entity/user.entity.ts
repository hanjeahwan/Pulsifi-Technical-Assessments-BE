import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity("user")
export class UserEntity {
  @PrimaryGeneratedColumn()
   id: number;

  @Column({
    unique: true,
  })
  email: string;

  @Column({
    select: false,
  })
  password: string;

  @Column('text')
   name: string;
}
