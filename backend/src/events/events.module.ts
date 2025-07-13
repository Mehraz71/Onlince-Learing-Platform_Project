

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEntity } from './events.entity';
import { StudentEntity } from 'src/student/student.entity';
import { EventService } from './events.service';
import { EventController } from './events.controller';
import { NotificationService } from 'src/notification/notification.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([EventEntity, StudentEntity]), 
  ],
  controllers: [EventController],
  providers: [EventService, NotificationService],
})
export class EventModule {}
