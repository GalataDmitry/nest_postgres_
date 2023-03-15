import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CocktsModule } from './cockts/cockts.module';
import { Cockts } from './schemas/cockts.model';
import {Descs} from './schemas/descs.model'
import { ConfigModule } from '@nestjs/config';
import { Ings } from './schemas/ings.model';
import { Cockts_ings_volumes } from './schemas/cockts_ings_volumes.model';
import { Volumes } from './schemas/volumes.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.envv'
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: process.env.USER_NAME,
      password: process.env.PASSWORD,
      database: process.env.DATA_BASE,
      models: [Cockts, Descs, Ings, Cockts_ings_volumes, Volumes],
      autoLoadModels: true
    }),
    CocktsModule,
  ]
})
export class MainModule {}
