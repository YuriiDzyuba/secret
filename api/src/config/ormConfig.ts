import { ConnectionOptions } from 'typeorm';
import * as path from 'path';
import { PairEntity } from '../participant/entities/pair.entity';
import { ParticipantEntity } from '../participant/entities/participant.entity';

const config: ConnectionOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL || "postgres://auth_user:8848@postgres-auth:5432/users",
  entities: [PairEntity, ParticipantEntity],
  synchronize: true,
  migrations: [path.join(__dirname + '../../migrations/**/*{.ts,.js}')], //?
  cli: {
    migrationsDir: 'src/migrations',
  },
};
export default config;
