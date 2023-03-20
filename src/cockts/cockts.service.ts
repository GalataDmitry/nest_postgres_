import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Cockts } from '../schemas/cockts.model';
import { Descs } from '../schemas/descs.model';
import { CocktsDto, DescsDto, IngsDto } from '../dto/dto';
import { Ings } from '../schemas/ings.model';
import { Volumes } from '../schemas/volumes.model';
import { Cockts_ings_volumes } from '../schemas/cockts_ings_volumes.model';
import { checkerFunction } from '../auxiliary_functions/auxiliary_functions';

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
      attributes: ['id', 'cockt_name'],
      include: { model: Cockts_ings_volumes, include: [Ings, Volumes] }// is work
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

    const newCockt = await this.CocktsModel.create({ cockt_name });
    await this.DescsModel.create({ cockt_id: newCockt.id, desc });

    if (Array.isArray(ing_name)) {
      for (let i = 0; i < ing_name.length; i++) {
        checkerFunction(
          i,
          ing_name,
          ing_volume,
          this.IngsModel,
          this.VolumesModel,
          this.CocktsIngsVolumesModels,
          true,
          newCockt,
        );
      }
    } else return 'Add ingredients';
    return { newCockt };
  }

  async updateDescription(updateDescDto: DescsDto) {
    const { desc, cockt_id } = updateDescDto;
    return await this.DescsModel.update({ desc }, { where: { id: cockt_id } });
  }

  async addIngredientAndVolume(addIngDto: IngsDto) {

    const { ing_name, cockt_id, ing_volume } = addIngDto;

    checkerFunction(
      cockt_id,
      ing_name,
      ing_volume,
      this.IngsModel,
      this.VolumesModel,
      this.CocktsIngsVolumesModels,
      false,
    );
  }
}