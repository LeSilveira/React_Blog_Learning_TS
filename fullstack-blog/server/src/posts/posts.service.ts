import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ){}

  async create(createPostDto: CreatePostDto): Promise<Post> {
    const newPost = this.postsRepository.create(createPostDto);
    return this.postsRepository.save(newPost);
  }

  async findAll(): Promise<Post[]> {
    const posts = await this.postsRepository.find();
    if (posts.length === 0 ){
      throw new NotFoundException(`Not a single post was found. Please register/create one. :)`);
    }
    return posts;
  }

  async findOne(id: number): Promise<Post> {
    const post = await this.postsRepository.findOneBy({id});
    if (!post){
      throw new NotFoundException(`The post with id ${id} isn't currently registred, please check if this is the right id. :)`);
    }
    return post;
  }

  async update(id: number, updatePostDto: UpdatePostDto): Promise<Post> {
    const post = await this.postsRepository.preload({
      id: id,
      ...updatePostDto,
    })
    if (!post){
      throw new NotFoundException(`The post with id ${id} couldn't be found for updating it's data, please check if it is registred. :)`);
    }
    
    return await this.postsRepository.save(post);
  }

  async remove(id: number): Promise<string> {
    const deleted = await this.postsRepository.delete(id);
    if (deleted.affected === 0){
      throw new NotFoundException(`The post ${id} was already deleted or doesn't exists. Either way, it's gone. :)`);
    }
    return `The post ${id} was succefully deleted. :)`;
  }
}
