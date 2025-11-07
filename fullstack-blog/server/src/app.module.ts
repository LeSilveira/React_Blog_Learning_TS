import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { PostsModule } from './posts/posts.module';
import { WelcomeModule } from './welcome/welcome.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'proj_blog',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    PostsModule,
    WelcomeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
