import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreatePostDto {
    @IsString()
    @IsNotEmpty({ message: 'You must insert a title with a minimum length of 5! :|' })
    @MinLength(5, { message: 'Password must be at least 5 characters long' })
    title: string;

    @IsString()
    @IsNotEmpty({ message: 'You must insert a content! :|' })
    content: string;
}
