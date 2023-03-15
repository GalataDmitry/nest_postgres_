import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Cockts } from '../schemas/cockts.model';
import { Descs } from '../schemas/descs.model';
import { CocktsDto } from '../dto/dto';
import { Ings } from '../schemas/ings.model';
import { Volumes } from '../schemas/volumes.model';
import { Cockts_ings_volumes } from '../schemas/cockts_ings_volumes.model';

@Injectable()
export class CocktsService {
  constructor(
    @InjectModel(Cockts)
    private CocktsModel: typeof Cockts,
    @InjectModel(Descs)
    private DescsModel: typeof Descs,
    @InjectModel(Ings)
    private IngsModel: typeof Ings,
    @InjectModel(Volumes)
    private VolumesModel: typeof Volumes,
    @InjectModel(Cockts_ings_volumes)
    private CocktsIngsVolumesModels: typeof Cockts_ings_volumes,
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
      ing_volume,
    } = addCocktDto;

    const checkForExistCocktail = await this.CocktsModel.findOne({ where: { cockt_name } });
    if (checkForExistCocktail) return 'Cocktail already exist';

    let newIngredient;
    let newVolume;

    const newCockt = await this.CocktsModel.create({ cockt_name });
    await this.DescsModel.create({ cockt_id: newCockt.id, desc });

    if (Array.isArray(ing_name)) {

      for (let i = 0; i < ing_name.length; i++) {

        const checkForExistIngredient = await this.IngsModel.findOne({ where: { ing_name: ing_name[i] } });
        const checkForExistVolume = await this.VolumesModel.findOne({ where: { ing_volume: ing_volume[i] } });


        if (checkForExistIngredient) {
          if (checkForExistVolume) {
            await this.CocktsIngsVolumesModels.create({
              cockt_id: newCockt.id,
              ing_id: checkForExistIngredient.id,
              vol_id: checkForExistVolume.id,
            });
          } else {
            newVolume = await this.VolumesModel.create({ ing_volume: ing_volume[i] });
            await this.CocktsIngsVolumesModels.create({
              cockt_id: newCockt.id,
              ing_id: checkForExistIngredient.id,
              vol_id: newVolume.id,
            });
          }
        } else if (checkForExistVolume) {
          if (checkForExistIngredient) {
            await this.CocktsIngsVolumesModels.create({
              cockt_id: newCockt.id,
              ing_id: checkForExistIngredient.id,
              vol_id: checkForExistVolume.id,
            });
          } else {
            newIngredient = await this.IngsModel.create({ ing_name: ing_name[i] });
            await this.CocktsIngsVolumesModels.create({
              cockt_id: newCockt.id,
              ing_id: newIngredient.id,
              vol_id: checkForExistVolume.id,
            });
          }
        } else {
          newIngredient = await this.IngsModel.create({ ing_name: ing_name[i] });
          newVolume = await this.VolumesModel.create({ ing_volume: ing_volume[i] });
          await this.CocktsIngsVolumesModels.create({
            cockt_id: newCockt.id,
            ing_id: newIngredient.id,
            vol_id: newVolume.id,
          });
        }
      }
    }
    return { newCockt, newIngredient };
  }

  addDescription(desc: string) {
    return this.DescsModel.create({ desc });
  }

  addIngredient(ing_name: string) {
    return this.IngsModel.create({ ing_name });
  }
}