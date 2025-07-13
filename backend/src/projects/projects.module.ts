import { Module } from '@nestjs/common';
import { ProjectService } from './projects.service';
import { ProjectController } from './projects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectEntity } from './projects-entity';
import { FileEntity } from 'src/Files/file.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectEntity, FileEntity])],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule {}
