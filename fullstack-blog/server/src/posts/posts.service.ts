import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) { }

  async create(createPostDto: CreatePostDto, author_id: number): Promise<Post> {
    const newPost = this.postsRepository.create({ ...createPostDto, author_id });
    return this.postsRepository.save(newPost);
  }

  async findAll(): Promise<Post[]> {
    const posts = await this.postsRepository.find();
    
    return posts;
  }

  async findOne(id: number): Promise<Post> {
    const post = await this.postsRepository.findOne({
      where: { id },
      relations: ['user'],
      select: {
        id: true,
        title: true,
        content: true,
        author_id: true,
        created_at: true,
        updated_at: true,
        // Select only some columns so it doesn't return things like the hashed password.
        user: {
          id: true,
          name: true,
          sur_name: true,
          email: true,
        },
      },
    },);
    if (!post) {
      throw new NotFoundException(`The post with id ${id} isn't currently registred, please check if this is the right id. :)`);
    }
    return post;
  }

  async update(id: number, updatePostDto: UpdatePostDto, user_id: number): Promise<Post> {
    const post = await this.postsRepository.preload({
      id: id,
      ...updatePostDto,
    })
    if (!post) {
      throw new NotFoundException(`The post with id ${id} couldn't be found for updating it's data, please check if it is registred. :)`);
    }

    if (user_id !== post.author_id) {
      throw new ForbiddenException('Only who created the post can alter it! :|');
    }


    return await this.postsRepository.save(post);
  }

  async remove(id: number, user_id: number): Promise<string> {
    const post = await this.postsRepository.findOneBy({ id });
    if (!post) {
      throw new NotFoundException(`The post with id ${id} couldn't be found for deleting it's data, please check if it is registred. :)`);
    }

    if (user_id !== post.author_id) {
      throw new ForbiddenException('Only who created the post can remove it! :|');
    }

    await this.postsRepository.delete(id);
    return `The post ${id} was succefully deleted. :)`;
  }
}
