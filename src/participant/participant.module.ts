import { Module } from '@nestjs/common';
import { ParticipantService } from './participant.service';
import { ParticipantController } from './participant.controller';
import {ParticipantEntity} from "./entities/participant.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {PairEntity} from "./entities/pair.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([ParticipantEntity, PairEntity]),
  ],
  controllers: [ParticipantController],
  providers: [ParticipantService, PairEntity]
})
export class ParticipantModule {}
