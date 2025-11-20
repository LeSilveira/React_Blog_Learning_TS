import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Public } from './public.decorator';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Public()
    @UseGuards(AuthGuard('local')) // Attach the return (user) to the request
    @Post('login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }
}