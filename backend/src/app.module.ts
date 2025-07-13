import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { User } from './users/user.entity';
import { CourseModule } from './course/course.module';
import { CourseService } from './course/course.service';
import { CourseController } from './course/course.controller';
import { CourseEntity } from './course/course-entity';
import { PostEntity } from './post/post-entity';
import { PostService } from './post/post.service';
import { PostController } from './post/post.controller';
import { SchedulerService } from './scheduler/scheduler.service';
import { SchedulerController } from './scheduler/scheduler.controller';
import { EventEntity } from './events/events.entity';
import { StudentEntity } from './student/student.entity';
import { EventService } from './events/events.service';
import { NotificationService } from './notification/notification.service';
import { EventController } from './events/events.controller';
import { EventModule } from './events/events.module';
import { FinanceModule } from './finance/finance.module';
import { TransactionEntity } from './finance/transaction.entity';
import { MonthlyFinanceSummaryEntity } from './finance/monthly_finance_summary.entity';
import { ExpenseEntity } from './finance/expenses.entity';
import { InstructorModule } from './instructor/instructor.module';
import { InstructorEntity } from './instructor/instructor_entity';
import { SalaryPaymentEntity } from './instructor/salary_payment.entity';
import { ProjectModule } from './projects/projects.module';
import { ProjectEntity } from './projects/projects-entity';
import { FileEntity } from './Files/file.entity';
import { StudentModule } from './student/student.module';
import { StudentService } from './student/student.service';
import { StudentController } from './student/student.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'db_02',
      entities: [
        User,
        CourseEntity,
        PostEntity,
        EventEntity,
        StudentEntity,
        TransactionEntity,
        MonthlyFinanceSummaryEntity,
        ExpenseEntity,
        InstructorEntity,
        SalaryPaymentEntity,
        ProjectEntity,
        FileEntity,
      ],
      synchronize: true,
    }),
    AuthModule,
    TypeOrmModule.forFeature([
      CourseEntity,
      PostEntity,
      EventEntity,
      StudentEntity,
    ]),
    FinanceModule,
    InstructorModule,
    ProjectModule,
    StudentModule,
  ],
  providers: [
    CourseService,
    PostService,
    SchedulerService,
    EventService,
    NotificationService,
        
  ],
  controllers: [
    CourseController,
    PostController,
    SchedulerController,
    EventController,
    
  ],
})
export class AppModule {}
