
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectEntity } from './projects-entity';

import { Repository } from 'typeorm';
import { FileEntity } from 'src/Files/file.entity';
import { CreateProjectDto } from './dto/create-projects.dto';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(ProjectEntity)
    private readonly projectRepo: Repository<ProjectEntity>,
    @InjectRepository(FileEntity)
    private readonly fileRepo: Repository<FileEntity>,
  ) {}

  async createProject(data: Partial<ProjectEntity>): Promise<ProjectEntity> {
    const newProject = this.projectRepo.create(data);
    return this.projectRepo.save(newProject);
  }

  async getAllProjects(): Promise<ProjectEntity[]> {
    return this.projectRepo.find();
  }
  async updateProject(
    id: number,
    data: Partial<ProjectEntity>,
  ): Promise<ProjectEntity> {
    await this.projectRepo.update(id, data);
    const updatedProject = await this.projectRepo.findOne({ where: { id } });
    if (!updatedProject) throw new NotFoundException('Project not found');
    return updatedProject;
  }

  async deleteProject(id: number): Promise<void> {
    const result = await this.projectRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Project not found');
    }
  }

  async getAllProjectsWithFiles(): Promise<ProjectEntity[]> {
    return this.projectRepo.find({ relations: ['files'] });
  }

  async getProjectById(id: number): Promise<ProjectEntity> {
    const project = await this.projectRepo.findOne({ where: { id } });
    if (!project) throw new NotFoundException('Project not found');
    return project;
  }

  async attachFileToProject(id: number, file: Express.Multer.File) {
    const project = await this.projectRepo.findOne({ where: { id } });
    if (!project) throw new NotFoundException('Project not found');

    const newFile = this.fileRepo.create({
      fileName: file.originalname,
      filePath: file.path,
      fileType: file.mimetype,
      project,
    });

    await this.fileRepo.save(newFile);
    return { message: 'File uploaded and attached to project', file: newFile };
  }

  async updateStatus(
    id: number,
    status: 'Pending' | 'Completed',
  ): Promise<ProjectEntity> {
    const project = await this.projectRepo.findOne({ where: { id } });

    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    project.status = status;
    return this.projectRepo.save(project);
  }
}
