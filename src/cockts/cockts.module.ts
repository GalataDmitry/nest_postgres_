import { Module } from '@nestjs/common';
import { CocktsController } from './cockts.controller';
import { CocktsService } from './cockts.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Cockts } from '../schemas/cockts.model';
import {Descs} from '../schemas/descs.model'
import { Ings } from '../schemas/ings.model';
import { Cockts_ings_volumes } from '../schemas/cockts_ings_volumes.model';
import { Volumes } from '../schemas/volumes.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Cockts, Descs, Ings, Cockts_ings_volumes, Volumes]),
  ],
  controllers: [CocktsController],
  providers: [CocktsService],
})
export class CocktsModule {
}
