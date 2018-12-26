import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import BaseEntity from '../../entities/base.entity';

@Entity("job")
export class JobEntity extends BaseEntity{

  @Column('text')
  title: string;

  @Column('text')
  breif: string;

  @Column('text')
  description: string;

  @Column('text')
  location: string;

  @Column('integer')
  status: number;
}
