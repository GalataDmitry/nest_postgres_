import { Module } from '@nestjs/common';
import { CocktsController } from './cockts.controller';
import { CocktsService } from './cockts.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Cockts } from '../schemas/cockst.model';
import {Descs} from '../schemas/descs.model'

@Module({
  imports: [
    SequelizeModule.forFeature([Cockts, Descs]),
  ],
  controllers: [CocktsController],
  providers: [CocktsService],
})
export class CocktsModule {
}
