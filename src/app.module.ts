import { Module } from '@nestjs/common';
import { ParticipantModule } from './participant/participant.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [ParticipantModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),],
})
export class AppModule {}
