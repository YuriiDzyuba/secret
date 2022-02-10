import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from "@nestjs/swagger";

@Entity('participant')
export class ParticipantEntity {
    @ApiProperty({ example: 2, description: 'primary generated column' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({example: 'Anna', description: 'user name',})
    @Column()
    name: string;

    @ApiProperty({example: 'Ivanova', description: 'user surname',})
    @Column()
    surname: string;

    @ApiProperty({example: '["cat","dog","candy"]', description: 'user surname',})
    @Column('simple-array')
    wishlist: string[];
}

