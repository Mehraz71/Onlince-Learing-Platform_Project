import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { PostEntity } from './post-entity';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('create_post')
  async createPost(@Body() createPostDto: CreatePostDto): Promise<PostEntity> {
    return this.postService.createPost(createPostDto);
  }

  @Get()
  async getAllPost(): Promise<PostEntity[]> {
    return this.postService.getAllPost();
  }

  
  @Get(':id')
  async getPostById(@Param('id') id: number): Promise<PostEntity> {
    return this.postService.getPostById(Number(id));
  }

  @Patch(':id/update_post')
  async updatePost(
    @Param('id') id: number,
    @Body() createPostDto: CreatePostDto,
  ): Promise<PostEntity> {
    return this.postService.updatePost(Number(id), createPostDto);
  }

  @Delete(':id/delete_post')
  async deletePost(@Param('id') id: number): Promise<void> {
    if (!id) {
      throw new NotFoundException('Post ID is required');
    }
    return this.postService.deletePost(Number(id));
  }
}
