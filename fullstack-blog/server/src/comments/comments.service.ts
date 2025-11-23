import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
  ) { }

  async create(createCommentDto: CreateCommentDto, author_id: number): Promise<Comment> {
    const newComment = this.commentRepository.create({ ...createCommentDto, author_id });
    return this.commentRepository.save(newComment);
  }

  async findAll(post_id?: number): Promise<Comment[]> {
    const where = post_id ? { where: { post_id }, }  : {};
    const comments = await this.commentRepository.find({
      ...where, relations: ['user'], select:
      {
        id: true, content: true, author_id: true, created_at: true, updated_at: true,
        user: { id: true, name: true, sur_name: true, email: true }
      }
    });
    
    return comments;
  }

  async findOne(id: number): Promise<Comment>  {
    const comment = await this.commentRepository.findOne({
      where: { id },
      relations: ['user'],
      select: {
        id: true,
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
    if (!comment) {
      throw new NotFoundException(`The comment with id ${id} couldn't be found. :|`);
    }
    return comment;
  }

  async update(id: number, updateCommentDto: UpdateCommentDto, user_id: number): Promise<Comment> {
    const comment = await this.commentRepository.preload({
      id: id,
      content: updateCommentDto.content,
    })
    if (!comment) {
      throw new NotFoundException(`The post with id ${id} couldn't be found for updating it's data, please check if it is registred. :)`);
    }

    if (user_id !== comment.author_id) {
      throw new ForbiddenException('Only who made the comment can alter it! :/');
    }


    return await this.commentRepository.save(comment);
  }

  async remove(id: number, user_id: number): Promise<string> {
    const comment = await this.commentRepository.findOneBy({ id });
    if (!comment) {
      throw new NotFoundException(`The comment with id ${id} couldn't be found for deleting it's data, please update the page and check if it stills exists. :)`);
    }

    if (user_id !== comment.author_id) {
      throw new ForbiddenException('Only who created the comment can remove it! :|');
    }

    await this.commentRepository.delete(id);
    return `The comment ${id} was succefully deleted. :)`;
  }
}
