import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InstructorEntity } from './instructor_entity';
import { CreateInstructorDto } from './dto/create_instructor.dto';
import { SalaryPaymentEntity } from './salary_payment.entity';
import { FinanceService } from 'src/finance/finance.service';
import { TransactionEntity } from 'src/finance/transaction.entity';
import { ExpenseEntity } from 'src/finance/expenses.entity';
import { NotificationService } from 'src/notification/notification.service';
import { CourseEntity } from 'src/course/course-entity';

@Injectable()
export class InstructorService {
  constructor(
    @InjectRepository(InstructorEntity)
    private readonly instructorRepo: Repository<InstructorEntity>,
    @InjectRepository(SalaryPaymentEntity)
    private readonly salaryRepo: Repository<SalaryPaymentEntity>,
    private readonly financeService: FinanceService,
    private readonly notificationService: NotificationService,
    @InjectRepository(CourseEntity)
    private readonly coursesRepository: Repository<CourseEntity>,
  ) {}

  async createInstructor(data: CreateInstructorDto): Promise<InstructorEntity> {
    const newInstructor = this.instructorRepo.create(data);
    return this.instructorRepo.save(newInstructor);
  }

  async getAllInstructors(): Promise<InstructorEntity[]> {
    return this.instructorRepo.find({relations:['courses']});
  }

  async getInstructorById(id: number): Promise<InstructorEntity> {
    const instructor = await this.instructorRepo.findOneBy({ id });
    if (!instructor) {
      throw new NotFoundException(`Instructor with ID ${id} not found`);
    }
    return instructor;
  }

  async updateInstructor(
    id: number,
    data: Partial<CreateInstructorDto>,
  ): Promise<InstructorEntity> {
    await this.instructorRepo.update(id, data);
    return this.getInstructorById(id);
  }

  async deleteInstructor(id: number): Promise<void> {
    await this.instructorRepo.delete(id);
  }

  async paySalary(id: number): Promise<void> {
    const instructor = await this.instructorRepo.findOneBy({ id });
    if (!instructor) {
      throw new NotFoundException(`Instructor with ID ${id} not found`);
    }

    const currentMonth = new Date().toISOString().slice(0, 7); 

    
    const alreadyPaid = await this.salaryRepo.findOne({
      where: {
        instructor: { id },
        month: currentMonth,
      },
      relations: ['instructor'],
    });

    if (alreadyPaid) {
      throw new ConflictException(`Salary for ${currentMonth} already paid`);
    }

    
    const salary = this.salaryRepo.create({
      instructor,
      amount: instructor.salary, 
      payment_method: instructor.payment_method,
      payment_date: new Date(),
      month: currentMonth,
    });
    await this.salaryRepo.save(salary);
    instructor.salary_status = 'paid';
    await this.instructorRepo.save(instructor);


    await this.notificationService.sendEmail(
      instructor.email,
      `Salary Payment`,
      `Dear ${instructor.name}
    \n\n Your Salary ${instructor.salary} is paid via ${instructor.payment_method}\n\n
    Thank You\nCoursera`,
    );

    await this.instructorRepo.save(instructor);
    
    const transactionData: Partial<TransactionEntity> = {
      name: instructor.name,
      category: 'Instructor Salary',
      transaction_type: 'payment',
      amount: instructor.salary,
      method: instructor.payment_method,
      paid_at: new Date(),
    };
    await this.financeService.createTransaction(transactionData);

  
    const createExpense: Partial<ExpenseEntity> = {
      title: `Salary for ${instructor.name}`,
      amount: instructor.salary,
      category: 'instructor_salary',
      paid_to: instructor.name,
      expense_date: new Date(),
    };
    await this.financeService.createExpense(createExpense);
  }

  

  async assignInstructor(instructorId: number, courseName: string) {
    const instructor = await this.instructorRepo.findOne({
      where: { id: instructorId },
      relations: ['courses'],
    });

    if (!instructor) {
      throw new NotFoundException('Instructor not found');
    }

    const course = await this.coursesRepository.findOne({
      where: { course_title: courseName },
    });

    if (!course) {
      throw new NotFoundException('Course not found');
    }

  
    instructor.courses.push(course);

    
    await this.instructorRepo.save(instructor);
    course.course_instructor = instructor.name;
    await this.coursesRepository.save(course);
    return { message: 'Instructor assigned to course successfully' };
  }
}
