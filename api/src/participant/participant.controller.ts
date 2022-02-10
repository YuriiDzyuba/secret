import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ParticipantService } from './participant.service';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { ParticipantEntity } from "./entities/participant.entity";

@ApiTags('participant module')
@Controller('participant')
export class ParticipantController {
  constructor(private readonly participantService: ParticipantService) {}

  @ApiOperation( { summary: 'create new participant'})
  @ApiResponse({ status: 201, type: ParticipantEntity})
  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @Post()
  async create(@Body() createParticipantDto: CreateParticipantDto) : Promise<ParticipantEntity> {
      return this.participantService.create(createParticipantDto);
  }

  @ApiOperation( { summary: 'get client',})
  @ApiResponse({ status: 200, type: ParticipantEntity})
  @Get(':id')
  async getClient(@Param('id') id: number) : Promise<ParticipantEntity> {
      return this.participantService.getClient(id);
  }

  @ApiOperation( {summary: 'shuffle participants'})
  @ApiResponse({status: 201, type: ParticipantEntity})
  @Post('shuffle')
  shuffle(): Promise<ParticipantEntity[]> {
    return this.participantService.shuffle();
  }

  @ApiOperation( {summary: 'delete shuffled participants'})
  @Delete('delete')
  deleteShuffledParticipants(): Promise<void> {
    return this.participantService.deleteShuffledParticipants();
  }

}
