import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { InjectRepository } from '@nestjs/typeorm'
import { ParticipantEntity } from './entities/participant.entity';
import { getConnection, Repository } from 'typeorm';
import { shuffle } from "../utils/shuffle";
import {PairEntity} from "./entities/pair.entity";

@Injectable()
export class ParticipantService {
  constructor(
      @InjectRepository(ParticipantEntity)
      private participantRepository: Repository<ParticipantEntity>,
      @InjectRepository(PairEntity)
      private pairRepository: Repository<PairEntity>
  ) { }


  async create(createParticipantDto: CreateParticipantDto): Promise<ParticipantEntity> {
    const participant = await this.findOne(500);

    if (participant) {
      throw new HttpException(
          {message: "can't add new participant. Max participants 500"},
          HttpStatus.BAD_REQUEST,
      );
    }
    return this.participantRepository.save(createParticipantDto)
  }

  async getClient(id: number) {
    const client =  await this.pairRepository.findOne({participantId: id})
    if (!client) {
      throw new HttpException(
          {message: "can't find participant"},
          HttpStatus.BAD_REQUEST,
      );
    }
    return  await this.findOne(client.santaForParticipant);
  }

  async findOne(id: number) {
    return await this.participantRepository.findOne(id)
  }

  async shuffle() {
    const isShuffled =  await this.pairRepository.findOne(1)

    if (isShuffled) {
      throw new HttpException(
          {message: "participants already shuffled"},
          HttpStatus.BAD_REQUEST,
      );
    }

    const allParticipants = await this.participantRepository.find()

    if (allParticipants.length <3 || allParticipants.length>500) {
      throw new HttpException(
          {message: "Can't shuffle. Participants must be more than 3 and less than 500"},
          HttpStatus.BAD_REQUEST,
      );
    }

    const shuffledParticipants = shuffle(allParticipants)

    const pairs = shuffledParticipants.map((e,i)=> {
      return {
        participantId: e.id,
        santaForParticipant: e.id === shuffledParticipants.length ? 1 : e.id+1
      }
    })

    return await this.pairRepository.save(pairs)
  }

  async deleteShuffledParticipants (): Promise<void>{
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from('pair')
      .execute()
  }
}
