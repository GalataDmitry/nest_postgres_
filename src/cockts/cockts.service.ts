import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Cockts } from '../schemas/cockst.model';
import {Descs} from '../schemas/descs.model'
import { CocktsDto } from '../dto/dto';

@Injectable()
export class CocktsService {
  constructor(
    @InjectModel(Cockts)
    private CocktsModel: typeof Cockts,
    @InjectModel(Descs)
    private DescsModel: typeof Descs,
  ) {
  }

  getAllCocktails() {
    return this.CocktsModel.findAll({
      include: Descs,
    });
  };

  async addCocktail(addCocktDto: CocktsDto) {
    const {
      cockt_name,
      desc
    } = addCocktDto;

    const checkForExist = await this.CocktsModel.findOne({where: {cockt_name}})
    if (checkForExist) return 'Cocktail already exist'
    const newCockt = await this.CocktsModel.create({ cockt_name });
    const newDesc = await this.DescsModel.create({ cockt_id: newCockt.id ,desc })
    return {newCockt, newDesc}
  }

  addDescription(desc: string) {
    console.log('desc service -->', desc);
    return this.DescsModel.create({ desc });
  }
}