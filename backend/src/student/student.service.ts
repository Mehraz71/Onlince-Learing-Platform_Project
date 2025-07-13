import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudentEntity } from './student.entity';
import { CreateStudnetDto } from './dto/create_student.dto';
import { CourseEntity } from 'src/course/course-entity';
import { TransactionEntity } from 'src/finance/transaction.entity'; 
import { FinanceService } from 'src/finance/finance.service'; 

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(StudentEntity)
    private readonly studentRepository: Repository<StudentEntity>,

    @InjectRepository(CourseEntity)
    private readonly courseRepository: Repository<CourseEntity>,

    @InjectRepository(TransactionEntity)
    private readonly transactionRepository: Repository<TransactionEntity>, 
  ) {}

  
  async createStudent(data: CreateStudnetDto): Promise<StudentEntity> {
    const newStudent = this.studentRepository.create(data);
    return this.studentRepository.save(newStudent);
  }

  async getAllStudent(): Promise<StudentEntity[]> {
    return this.studentRepository.find({ relations: ['courses'] });
  }

  async enrollStudentInCourse(studentId: number, courseId: number): Promise<{ message: string }> {
    const student = await this.studentRepository.findOne({
      where: { id: studentId },
      relations: ['courses'],
    });

    const course = await this.courseRepository.findOneBy({ id: courseId });

    if (!student || !course) {
      throw new NotFoundException('Student or course not found');
    }

    
    const isAlreadyEnrolled = student.courses.some(c => c.id === course.id);
    if (!isAlreadyEnrolled) {
      student.courses.push(course);
      await this.studentRepository.save(student);
    }

    
    const transaction: Partial<TransactionEntity> = {
      student_id: student.id,
      name: student.name,
      transaction_type: 'payment',
      amount: course.course_price || 0,
      category: 'course',
      method: 'Bkash',
      paid_at: new Date(),
    };

    await this.transactionRepository.save(transaction); 

    return { message: 'Course enrolled and transaction recorded' };
  }
}
