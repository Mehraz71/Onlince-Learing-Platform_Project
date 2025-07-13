import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  NotFoundException,
  Patch,
  UseGuards,
  Query,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CourseEntity } from './course-entity';

@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post('create_course')
  async createCourse(
    @Body() createCourseDto: CreateCourseDto,
  ): Promise<CourseEntity> {
    return this.courseService.createCourse(createCourseDto);
  }

  @Get()
  async getAllCourses(): Promise<CourseEntity[]> {
    return this.courseService.getAllCourses();
  }

  @Get(':id')
  async getCourseById(@Param('id') id: number): Promise<CourseEntity> {
    const course = await this.courseService.findCourseById(id);
    if (!course) {
      throw new NotFoundException('Course not found');
    }
    return course;
  }

@Get('search/title/:title')
async searchCoursesByTitle(@Param('title') title: string): Promise<CourseEntity[]> {
  const courses = await this.courseService.findByTitlePartial(title);
  if (!courses || courses.length === 0) {
    throw new NotFoundException('No courses found');
  }
  return courses;
}

@Get('autocomplete/title')
async autocompleteTitle(@Query('q') query: string): Promise<string[]> {
  if (!query || query.trim().length === 0) return [];
  const courses = await this.courseService.findTitlesLike(query);
  
  return courses.map(c => c.course_title);
}


  @Patch('update-course/:id')
  async updateCourse(
    @Param('id') id: number,
    @Body() updateCourseDto: UpdateCourseDto,
  ): Promise<CourseEntity> {
    return this.courseService.updateCourse(id, updateCourseDto);
  }

  @Delete('delete-course/:id')
  async deleteCourse(@Param('id') id: number): Promise<string> {
    return this.courseService.deleteCourse(id);
  }

  @Get(':id/enrollment')
  async getTotalEnrolled(
    @Param('id') id: number,
  ): Promise<{ course_title: string; total_enrolled: number }> {
    return this.courseService.getTotalEnrolled(id);
  }

  @Get(':id/course-instructor')
  async getCoursesByInstructor(
    @Param('course_instructor') course_instructor: string,
  ): Promise<CourseEntity[]> {
    return this.courseService.getCoursesByInstructor(course_instructor);
  }
}
