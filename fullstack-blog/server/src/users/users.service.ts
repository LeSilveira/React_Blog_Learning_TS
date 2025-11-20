import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<any> {
    const emailExists =
      (await this.usersRepository.findOne({
        where: { email: createUserDto.email },
      })) ?? false;

    if (emailExists) {
      throw new BadRequestException(
        "A user with this same email was already created, check if u don't have an account already! :|",
      );
    }

    // Change the password text by the hashed password to store it in the databse.
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      saltRounds,
    );

    createUserDto.password = hashedPassword;

    const user = this.usersRepository.create(createUserDto);
    const { password, ...result } = await this.usersRepository.save(user);
    return result;
  }

  async findAll(): Promise<User[]> {
    const users = await this.usersRepository.find();

    if (users.length === 0) {
      throw new NotFoundException(
        'Not a single user was found in the database, please, register one first! :)',
      );
    }

    return users;
  }

  async findOneEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { email: email },
    });

    if (!user) {
      throw new NotFoundException(
        `No user is registered with the email ${email}. Please, check if the email is currect or register one! :)`,
      );
    }

    return user;
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id: id },
    });

    if (!user) {
      throw new NotFoundException(
        `No user is registered with the email ${id}. Please, check if the email is currect or register one! :)`,
      );
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.usersRepository.preload({
      id: id,
      ...updateUserDto,
    });

    if (!user) {
      throw new NotFoundException(
        `Couldn't find the user with id ${id} to update it. Check if it still exists! :)`,
      );
    }

    return await this.usersRepository.save(user);
  }

  async remove(id: number): Promise<string> {
    const deleted = await this.usersRepository.delete(id);
    if (deleted.affected === 0) {
      throw new NotFoundException(
        `The user ${id} was already deleted or doesn't exists. Either way, it's gone. :)`,
      );
    }
    return `The user ${id} was succefully deleted. :)`;
  }
}