import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Cockts } from '../schemas/cockst.model';

@Injectable()
export class CocktsService {
  constructor(
    @InjectModel(Cockts)
    private CocktsModel: typeof Cockts,
  ) {}

  getAllCocktails = () => {
    //const reqData = this.CocktsModel.findAll();
    return this.CocktsModel.findAll();
  };
  addCocktail = () => {
    return this.CocktsModel.create({cocktName: 'test#2'})
  }
}
