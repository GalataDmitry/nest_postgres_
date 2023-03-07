import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CocktsModule } from './cockts/cockts.module';
import { Cockts } from './schemas/cockst.model';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'dmitriygalata',
      password: 'root',
      database: 'cockts_base',
      models: [Cockts],
      autoLoadModels: true
    }),
    CocktsModule,
  ],
  // controllers: [],
  // providers: [],
})
export class MainModule {}
