import {Entity, Column, PrimaryColumn} from 'typeorm';

@Entity('pair')
export class PairEntity {
    @PrimaryColumn()
    participantId: number;

    @Column()
    santaForParticipant: number;
}

