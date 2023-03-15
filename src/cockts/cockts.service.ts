import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Cockts } from '../schemas/cockts.model';
import { Descs } from '../schemas/descs.model';
import { CocktsDto } from '../dto/dto';
import { Ings } from '../schemas/ings.model';
import { Cockts_ings } from '../schemas/cockts_ings.model';

@Injectable()
export class CocktsService {
  constructor(
    @InjectModel(Cockts)
    private CocktsModel: typeof Cockts,
    @InjectModel(Descs)
    private DescsModel: typeof Descs,
    @InjectModel(Ings)
    private IngsModel: typeof Ings,
    @InjectModel(Cockts_ings)
    private CocktsIngsModel: typeof Cockts_ings,
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
      desc,
      ing_name,
    } = addCocktDto;

    const checkForExistCocktail = await this.CocktsModel.findOne({ where: { cockt_name } });
    if (checkForExistCocktail) return 'Cocktail already exist';

    const newCockt = await this.CocktsModel.create({ cockt_name });
    await this.DescsModel.create({ cockt_id: newCockt.id, desc });

    let existIngredient;
    let newIngredient;

    if (Array.isArray(ing_name)) {

      for (let i = 0; i < ing_name.length; i++) {
        const checkForExistIngredient = await this.IngsModel.findOne({ where: { ing_name: ing_name[i] } });
        if (checkForExistIngredient) {
          existIngredient = await this.IngsModel.findOne({ where: { ing_name: ing_name[i] } });
          await this.CocktsIngsModel.create({ cockt_id: newCockt.id, ing_id: existIngredient.id });
        } else {
          newIngredient = await this.IngsModel.create({ ing_name: ing_name[i] });
          await this.CocktsIngsModel.create({ cockt_id: newCockt.id, ing_id: newIngredient.id });
        }
      }
    }
    // const checkForExistIngredient = await this.IngsModel.findOne({ where: { ing_name } });
    // if (checkForExistIngredient) {
    //   const existIngredient = await this.IngsModel.findOne({ where: { ing_name } });
    //   return existIngredient.id;
    // }
    // const newIngredient = await this.IngsModel.create({ ing_name });
    // return newIngredient.id;
    return { newCockt, existIngredient, newIngredient };
  }

  addDescription(desc: string) {
    console.log('desc service -->', desc);
    return this.DescsModel.create({ desc });
  }

  addIngredient(ing_name: string) {
    return this.IngsModel.create({ ing_name });
  }
}