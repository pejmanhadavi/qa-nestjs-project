import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { QuestionsModule } from './questions/questions.module';
import { CategoriesModule } from './categories/categories.module';
import { AnswersModule } from './answers/answers.module';

@Module({
  imports: [
    // Connect to sqlite
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
   }),
    UsersModule,
    AuthModule,
    QuestionsModule,
    CategoriesModule,
    AnswersModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
