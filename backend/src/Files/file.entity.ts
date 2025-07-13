
import { ProjectEntity } from 'src/projects/projects-entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('files')
export class FileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fileName: string;

  @Column()
  filePath: string;

  @Column()
  fileType: string;

  @ManyToOne(() => ProjectEntity, (project) => project.files, {
    onDelete: 'CASCADE',
  })
  project: ProjectEntity;
}
