import { Module } from "@nestjs/common";
import { StudentController } from "./student.controller";
import { StudentService } from "./student.service";
import { StudentEntity } from "./student.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CourseEntity } from "src/course/course-entity";
import { TransactionEntity } from "src/finance/transaction.entity";

@Module({
    imports:[TypeOrmModule.forFeature([StudentEntity,CourseEntity,TransactionEntity])],
    controllers:[StudentController],
    providers:[StudentService],
})
export class StudentModule{}