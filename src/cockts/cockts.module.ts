import { Module } from '@nestjs/common';
import { CocktsController } from './cockts.controller';
import { CocktsService } from './cockts.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Cockts } from '../schemas/cockst.model';

@Module({
  imports: [SequelizeModule.forFeature([Cockts])],
  controllers: [CocktsController],
  providers: [CocktsService]
})
export class CocktsModule {}
