import { CheckerFunctionParamsType } from './auxiliary_functions_types';

export const checkerFunction: CheckerFunctionParamsType =
  async (
    i_or_cockt_id,
    ing_name,
    ing_volume,
    IngsModel,
    VolumesModel,
    CocktsIngsVolumesModels,
    cycle,
    newCockt,
  ) => {

    let newIngredient;
    let newVolume;
    let checkForExistIngredient;
    let checkForExistVolume;

    if (cycle) {
      checkForExistIngredient = await IngsModel.findOne({ where: { ing_name: ing_name[i_or_cockt_id] } });
      checkForExistVolume = await VolumesModel.findOne({ where: { ing_volume: ing_volume[i_or_cockt_id] } });
    } else {
      checkForExistIngredient = await IngsModel.findOne({ where: { ing_name } });
      checkForExistVolume = await VolumesModel.findOne({ where: { ing_volume } });
    }


    if (checkForExistIngredient) {
      if (checkForExistVolume) {
        if (cycle) {
          await CocktsIngsVolumesModels.create({
            cockt_id: newCockt.id,
            ing_id: checkForExistIngredient.id,
            vol_id: checkForExistVolume.id,
          });
        } else {
          await CocktsIngsVolumesModels.create({
            cockt_id: i_or_cockt_id,
            ing_id: checkForExistIngredient.id,
            vol_id: checkForExistVolume.id,
          });
        }

      } else {
        if (cycle) newVolume = await VolumesModel.create({ ing_volume: ing_volume[i_or_cockt_id] });
        else newVolume = await VolumesModel.create({ ing_volume });
        if (cycle) {
          await CocktsIngsVolumesModels.create({
            cockt_id: newCockt.id,
            ing_id: checkForExistIngredient.id,
            vol_id: newVolume.id,
          });
        } else {
          await CocktsIngsVolumesModels.create({
            cockt_id: i_or_cockt_id,
            ing_id: checkForExistIngredient.id,
            vol_id: newVolume.id,
          });
        }
      }
    } else if (checkForExistVolume) {
      if (checkForExistIngredient) {
        if (cycle) {
          await CocktsIngsVolumesModels.create({
            cockt_id: newCockt.id,
            ing_id: checkForExistIngredient.id,
            vol_id: checkForExistVolume.id,
          });
        } else {
          await CocktsIngsVolumesModels.create({
            cockt_id: i_or_cockt_id,
            ing_id: checkForExistIngredient.id,
            vol_id: checkForExistVolume.id,
          });
        }
      } else {
        if (cycle) newIngredient = await IngsModel.create({ ing_name: ing_name[i_or_cockt_id] });
        else newIngredient = await IngsModel.create({ ing_name });
        if (cycle) {
          await CocktsIngsVolumesModels.create({
            cockt_id: newCockt.id,
            ing_id: newIngredient.id,
            vol_id: checkForExistVolume.id,
          });
        } else {
          await CocktsIngsVolumesModels.create({
            cockt_id: i_or_cockt_id,
            ing_id: newIngredient.id,
            vol_id: checkForExistVolume.id,
          });
        }
      }
    } else {
      if (cycle) {
        newIngredient = await IngsModel.create({ ing_name: ing_name[i_or_cockt_id] });
        newVolume = await VolumesModel.create({ ing_volume: ing_volume[i_or_cockt_id] });
      } else {
        newIngredient = await IngsModel.create({ ing_name });
        newVolume = await VolumesModel.create({ ing_volume });
      }
      if (cycle) {
        await CocktsIngsVolumesModels.create({
          cockt_id: newCockt.id,
          ing_id: newIngredient.id,
          vol_id: newVolume.id,
        });
      } else {
        await CocktsIngsVolumesModels.create({
          cockt_id: i_or_cockt_id,
          ing_id: newIngredient.id,
          vol_id: newVolume.id,
        });
      }
    }
  };