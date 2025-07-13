import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventEntity } from './events.entity';
import { Repository } from 'typeorm';
import { CreateEventDto } from './dto/create-events.dto';
import { StudentEntity } from 'src/student/student.entity';
import { NotificationService } from 'src/notification/notification.service';
import { retry } from 'rxjs';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(EventEntity)
    private readonly eventRepository: Repository<EventEntity>,

    @InjectRepository(StudentEntity)
    private readonly studentRepository: Repository<StudentEntity>,

    private readonly notificationService: NotificationService,
  ) {}

  async createEvent(data: CreateEventDto): Promise<EventEntity> {
    
    const newEvent = this.eventRepository.create(data);
    const savedEvent = await this.eventRepository.save(newEvent);

    
    const students = await this.studentRepository.find();

  
    for (const student of students) {
      await this.notificationService.sendEmail(
        student.email,
        `New Event Scheduled: ${savedEvent.title}`,
        `Hello ${student.name},

A new event has been scheduled.

Date: ${savedEvent.date}
Time: ${savedEvent.event_start_time} - ${savedEvent.event_end_time}
Title: ${savedEvent.title}

Please attend on time.

- Coursera Team`,
      );
    }

    return savedEvent;
  }

  async getAllEvent(): Promise<EventEntity[]> {
    return this.eventRepository.find();
  }

async updateEvent(id: number, updateData: Partial<EventEntity>): Promise<EventEntity> {
    const event = await this.eventRepository.findOne({ where: { id } });
    if (!event) throw new NotFoundException('Event not found');

    const updated = Object.assign(event, updateData);
    return this.eventRepository.save(updated);
  }

  async deleteEvent(id: number): Promise<{ message: string }> {
    const result = await this.eventRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Event not found');
    }

    return { message: 'Event deleted successfully' };
  }

}
