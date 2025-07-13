import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ProjectService } from './projects.service';
import { CreateProjectDto } from './dto/create-projects.dto';
import { ProjectEntity } from './projects-entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post('create_project')
  async createProject(
    @Body() CreateProjectDto: CreateProjectDto,
  ): Promise<ProjectEntity> {
    return this.projectService.createProject(CreateProjectDto);
  }

  @Get()
  async getAllProjects(): Promise<ProjectEntity[]> {
    return this.projectService.getAllProjects();
  }

  @Get(':id')
  async getProjectById(@Param('id') id: number): Promise<ProjectEntity> {
    const project = await this.projectService.getProjectById(id);
    return project;
  }

  @Post(':id/upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/projects',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueSuffix + extname(file.originalname));
        },
      }),
    }),
  )
  async uploadFile(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.projectService.attachFileToProject(id, file);
  }

  @Patch(':id/status')
  async changeStatus(
    @Param('id') id: number,
    @Body('status') status: 'Pending' | 'Completed',
  ) {
    return this.projectService.updateStatus(id, status);
  }

  @Patch('/:id/update-project')
  async updateProject(
    @Param('id') id: number,
    @Body() updateProjectDto: CreateProjectDto,
  ): Promise<ProjectEntity> {
    const updatedProject = await this.projectService.updateProject(
      id,
      updateProjectDto,
    );
    if (!updatedProject) {
      throw new NotFoundException('Project not found');
    }
    return updatedProject;
  }


  @Delete('/:id/delete-project')
  async deleteProject(@Param('id') id: number): Promise<void> {
    if (!id) {
      throw new NotFoundException('Project ID is required');
    }
    return this.projectService.deleteProject(id);
  }


}
