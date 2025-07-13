import { Body, Controller, Get, Param, ParseIntPipe, Post } from "@nestjs/common";
import { StudentService } from "./student.service";
import { CreateStudnetDto } from "./dto/create_student.dto";
import { StudentEntity } from "./student.entity";

@Controller('students')
export class StudentController{
    constructor(private readonly studentService: StudentService){}

@Post('create_student')
async createStudent(@Body() createStudentDto :CreateStudnetDto): Promise<StudentEntity>{
    return this.studentService.createStudent(createStudentDto);
}

@Get()
async getAllStudent(): Promise<StudentEntity[]>{
    return this.studentService.getAllStudent();
}

@Post(':studentId/enroll/:courseId')
  async enrollStudentInCourse(
    @Param('studentId', ParseIntPipe) studentId: number,
    @Param('courseId', ParseIntPipe) courseId: number,
  ): Promise<{ message: string }> {
    return this.studentService.enrollStudentInCourse(studentId, courseId);
  }

}