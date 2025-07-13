import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchedulerService } from './scheduler.service';
import { SchedulerController } from './scheduler.controller';
import { CourseEntity } from 'src/course/course-entity';

@Module({
  imports: [TypeOrmModule.forFeature([CourseEntity])],
  providers: [SchedulerService],
  controllers: [SchedulerController],
})
export class SchedulerModule {}
