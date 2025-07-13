// src/event/event.controller.ts

import { Controller, Post, Body, Get, Patch, Delete, Param, ParseIntPipe } from '@nestjs/common';
import { EventService } from './events.service';
import { CreateEventDto } from './dto/create-events.dto';
import { EventEntity } from './events.entity';

@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post('create-event')
  async createEvent(@Body() createEventDto: CreateEventDto): Promise<{
    message: string;
    event: EventEntity;
  }> {
    const event = await this.eventService.createEvent(createEventDto);

    return {
      message: 'Event created and notifications sent to all students.',
      event,
    };
  }

  @Get()
  async getAllEvent(): Promise<EventEntity[]> {
    return this.eventService.getAllEvent();
  }



  @Patch('/:id/update-event')
  async updateEvent(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateData: Partial<EventEntity>,
  ): Promise<EventEntity> {
    return this.eventService.updateEvent(id, updateData);
  }

  @Delete('/:id/delete-event')
  async deleteEvent(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ message: string }> {
    return this.eventService.deleteEvent(id);
  }
}
