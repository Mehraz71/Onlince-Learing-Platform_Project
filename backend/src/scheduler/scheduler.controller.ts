import {
  Body,
  Controller,
  Param,
  Post,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { SchedulerService } from './scheduler.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { CourseEntity } from 'src/course/course-entity';

@Controller('scheduler')
export class SchedulerController {
  constructor(private readonly schedulerService: SchedulerService) {}

  @Post(':id/schedule')
  async scheduleCourse(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: CreateScheduleDto,
  ): Promise<CourseEntity> {
    const result = await this.schedulerService.schedule(id, data);
    if (!result) throw new NotFoundException('Course not found or not updated');
    return result;
  }
}
