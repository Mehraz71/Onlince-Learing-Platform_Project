import { FileEntity } from 'src/Files/file.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('project')
export class ProjectEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  deadline: string;

  @Column({ default: 'Pending' })
  status: 'Pending' | 'Completed';

  @OneToMany(() => FileEntity, (file) => file.project, { cascade: true })
  files: FileEntity[];
}
