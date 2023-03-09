import { Module } from '@nestjs/common';
import { CocktsController } from './cockts.controller';
import { CocktsService } from './cockts.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Cockts } from '../schemas/cockst.model';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    SequelizeModule.forFeature([Cockts]),
    // ConfigModule.forRoot({
    //   envFilePath: '../env',
    // }),
  ],
  controllers: [CocktsController],
  providers: [CocktsService],
})
export class CocktsModule {
}
