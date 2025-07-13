import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseEntity } from 'src/course/course-entity';
import { Repository } from 'typeorm';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { promises } from 'dns';

@Injectable()
export class SchedulerService {
  constructor(
    @InjectRepository(CourseEntity)
    private readonly schedulerRepository: Repository<CourseEntity>,
  ) {}
  async findCourseById(id: number): Promise<CourseEntity | null> {
    return this.schedulerRepository.findOne({ where: { id } });
  }

  async schedule(id: number, data: CreateScheduleDto): Promise<CourseEntity> {
    const course = await this.findCourseById(id);
    if (!course) throw new NotFoundException('Course not found');

    Object.assign(course, data);
    return this.schedulerRepository.save(course);
  }
}
