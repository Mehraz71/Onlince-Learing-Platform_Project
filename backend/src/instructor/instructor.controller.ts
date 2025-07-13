import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { InstructorService } from './instructor.service';
import { CreateInstructorDto } from './dto/create_instructor.dto';
import { InstructorEntity } from './instructor_entity';

@Controller('instructor')
export class InstructorController {
  constructor(private readonly instructorService: InstructorService) {}

  @Post('create_instructor')
  async createInstructor(
    @Body() CreateInstructorDto: CreateInstructorDto,
  ): Promise<InstructorEntity> {
    return this.instructorService.createInstructor(CreateInstructorDto);
  }

  @Get()
  async getAllInstructor(): Promise<InstructorEntity[]> {
    return this.instructorService.getAllInstructors();
  }

  @Get(':id')
  async getById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<InstructorEntity> {
    return this.instructorService.getInstructorById(id);
  }


  @Patch('update/:id')
  async updateInstructor(
    @Param('id') id:number,
    @Body() createInstructorDto: CreateInstructorDto,
  ) : Promise<InstructorEntity>{
    return this.instructorService.updateInstructor(id, createInstructorDto);
  }

  @Post('pay-salary/:id')
  paySalary(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.instructorService.paySalary(id);
  }

  @Post('assign/:id')
  async assignToCourse(
    @Param('id') instructorId: number,
    @Body('courseName') courseName: string,
  ) {
    return this.instructorService.assignInstructor(instructorId, courseName);
  }
}
