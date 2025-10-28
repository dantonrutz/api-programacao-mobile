import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ClassroomModule } from './classroom/classroom.module';
import { ExerciseModule } from './exercise/exercise.module';
import { AnswerModule } from './answer/answer.module';
import { ProgressModule } from './progress/progress.module';
import { RankingModule } from './ranking/ranking.module';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    UserModule,
    ClassroomModule,
    ExerciseModule,
    AnswerModule,
    ProgressModule,
    RankingModule,
    NotificationModule
  ],
})
export class AppModule { }
