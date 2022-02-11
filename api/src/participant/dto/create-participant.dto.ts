import {ArrayMaxSize, ArrayMinSize, IsArray, IsNotEmpty, IsOptional, MaxLength, MinLength} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateParticipantDto {
    @ApiProperty({
        example: 'Vanusha',
        description: 'new participant name',
    })
    @MinLength(2)
    @MaxLength(66)
    @IsNotEmpty()
    readonly name: string;

    @ApiProperty({
        example: 'Ivanovish',
        description: 'new participant surname',
    })
    @MinLength(2)
    @MaxLength(66)
    @IsNotEmpty()
    readonly surname: string;

    @ApiProperty({
        example: '["cat","bike","PS","comp"]',
        description: 'array of gifts',
    })
    @IsArray()
    @MinLength(1, { each: true })
    @MaxLength(22, { each: true })
    @ArrayMinSize(1)
    @ArrayMaxSize(10)
    @IsNotEmpty()
    readonly wishlist: string[];
}
