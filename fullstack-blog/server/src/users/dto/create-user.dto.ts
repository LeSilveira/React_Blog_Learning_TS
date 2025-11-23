import { IsEmail, IsNotEmpty, MinLength, IsString, IsInt } from 'class-validator';

export class CreateUserDto {
      @IsEmail({}, { message: 'This is not a regular email! :/' })
      email: string;
      @IsNotEmpty({ message: 'You must insert a password with a minimum length of 6! :|' })
      @MinLength(6, { message: 'Password must be at least 6 characters long' })
      password: string;
      
      @IsString()
      name: string;

      @IsString()
      sur_name: string;

      @IsInt()
      age: number;

      @IsString()
      gender: string;

      @IsString()
      cpf: string;
}
