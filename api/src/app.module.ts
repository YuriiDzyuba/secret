import { Module } from '@nestjs/common';
import { ParticipantModule } from './participant/participant.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from './config/ormConfig';


@Module({
  imports: [ParticipantModule,
    TypeOrmModule.forRoot(config)],
})
export class AppModule {}
