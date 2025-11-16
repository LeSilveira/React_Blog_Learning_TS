import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto'; 
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService,
    private usersService: UsersService){}

    @UseGuards(AuthGuard('local')) // Attach the return (user) to the request
    @Post('login')
    async login(@Request() req){
        return this.authService.login(req.user);
    }
}