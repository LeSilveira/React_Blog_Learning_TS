import { Controller, Get} from '@nestjs/common';

@Controller('welcome')
export class WelcomeController {
    @Get()
    async get(){
        return "Welcome to my humble project in NestJS! :)";
    }
}
