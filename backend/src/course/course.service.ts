import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { CourseEntity } from './course-entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(CourseEntity)
    private readonly coursesRepository: Repository<CourseEntity>,
  ) {}

  async createCourse(data: CreateCourseDto): Promise<CourseEntity> {
    const existingCourse = await this.coursesRepository.findOne({
      where: { course_title: data.course_title },
    });

    if (existingCourse) {
      throw new NotFoundException('Course already exists!');
    }

    const newCourse = this.coursesRepository.create(data);
    return this.coursesRepository.save(newCourse);
  }

  async findCourseById(id: number): Promise<CourseEntity | null> {
    return this.coursesRepository.findOne({ where: { id } });
  }
  
async findByTitlePartial(title: string): Promise<CourseEntity[]> {
  return this.coursesRepository.find({
    where: {
      course_title: ILike(`%${title}%`),  
    },
  });
}

async findTitlesLike(query: string): Promise<CourseEntity[]> {
  return this.coursesRepository.find({
    select: ['course_title'], 
    where: { course_title: ILike(`%${query}%`) },
    take: 10,
  });
}

  async getAllCourses(): Promise<CourseEntity[]> {
    return this.coursesRepository.find();
  }

  async updateCourse(id: number, data: UpdateCourseDto): Promise<CourseEntity> {
    const course = await this.findCourseById(id);
    if (!course) throw new NotFoundException('Course not found');

    Object.assign(course, data);
    return this.coursesRepository.save(course);
  }

  async deleteCourse(id: number): Promise<string> {
    const course = await this.findCourseById(id);
    if (!course) throw new NotFoundException('Course not found');

    await this.coursesRepository.delete(id);
    return 'Course deleted successfully';
  }

  async getTotalEnrolled(
    id: number,
  ): Promise<{ course_title: string; total_enrolled: number }> {
    const course = await this.findCourseById(id);
    if (!course) throw new NotFoundException('Course not found');

    return {
      course_title: course.course_title,
      total_enrolled: course.total_enrolled,
    };
  }

  async getCoursesByInstructor(
    course_instructor: string,
  ): Promise<CourseEntity[]> {
    const courses = await this.coursesRepository.find({
      where: { course_instructor },
    });
    if (!courses || courses.length === 0)
      throw new NotFoundException('No courses found for this instructor');

    return courses;
  }

  async findOneWithStudents(id: number): Promise<CourseEntity | null> {
    return this.coursesRepository.findOne({
      where: { id },
      relations: ['students'],
    });
  }
}
