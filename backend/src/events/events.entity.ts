// src/event/event.entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { CourseEntity } from 'src/course/course-entity';

@Entity('events')
export class EventEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  date: string;

  @Column()
  event_start_time: string;

  @Column()
  event_end_time: string;

  @Column({ nullable: true })
  location: string;

  @Column({ default: 'upcoming' })
  status: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
