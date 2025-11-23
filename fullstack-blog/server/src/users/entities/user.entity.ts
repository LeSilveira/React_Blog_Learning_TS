import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Post } from '../../posts/entities/post.entity';
import { Comment } from '../../comments/entities/comment.entity';
import { Exclude } from 'class-transformer';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  name: string;

  @Column()
  sur_name: string;

  @Column()
  age: number;

  @Column()
  gender: string;

  @Column({unique: true})
  cpf: string;

  @OneToMany(() => Post, (post) => post.author_id)
  posts: Post[]
  
  @OneToMany(() => Comment, (comment) => comment.author_id)
  comments: Comment[]

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
