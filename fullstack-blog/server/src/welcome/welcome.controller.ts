import { Controller, Get} from '@nestjs/common';
import { Public } from '../auth/public.decorator';

@Controller('welcome')
export class WelcomeController {
    @Public()
    @Get()
    async get(){
        return "Welcome to my humble project in NestJS! :)";
    }
}
