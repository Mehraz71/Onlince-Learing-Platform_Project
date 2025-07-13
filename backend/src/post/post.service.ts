import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from './post-entity';
import { Not, Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
  ) {}
  async createPost(data: CreatePostDto): Promise<PostEntity> {
    const newPost = this.postRepository.create(data);
    return this.postRepository.save(newPost);
  }

  async getAllPost(): Promise<PostEntity[]> {
    return this.postRepository.find();
  }

  async getPostById(id: number): Promise<PostEntity> {
    const post = await this.postRepository.findOneBy({ id });
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    return post;
  }
  async updatePost(id: number, data: CreatePostDto): Promise<PostEntity> {
    await this.postRepository.update(id, data);
    return this.getPostById(id);
  }

  async deletePost(id: number): Promise<void> {
    const result = await this.postRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    console.log(`Post with ID ${id} deleted successfully`);
  }
}
