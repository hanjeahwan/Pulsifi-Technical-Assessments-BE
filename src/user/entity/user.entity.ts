import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import BaseEntity from '../../entities/base.entity';

@Entity("user")
export class UserEntity extends BaseEntity {

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
