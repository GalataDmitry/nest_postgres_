import { NestFactory } from '@nestjs/core';
import { MainModule } from './main.module';
import sequelize from '@nestjs/sequelize';

async function runner() {
  const app = await NestFactory.create(MainModule);
  const PORT = process.env.PORT || 3005;
  await app.listen(PORT, () => console.log(`server RUN on port ${PORT}`));
}

runner()
