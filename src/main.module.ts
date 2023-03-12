import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CocktsModule } from './cockts/cockts.module';
import { Cockts } from './schemas/cockst.model';
import {Descs} from './schemas/descs.model'
import { ConfigModule } from '@nestjs/config';

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
      models: [Cockts, Descs],
      autoLoadModels: true
    }),
    CocktsModule,
  ],
  // controllers: [],
  // providers: [],
})
export class MainModule {}
