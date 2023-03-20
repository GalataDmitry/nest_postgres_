import { Cockts } from '../schemas/cockts.model';
import { Ings } from '../schemas/ings.model';
import { Volumes } from '../schemas/volumes.model';
import { Cockts_ings_volumes } from '../schemas/cockts_ings_volumes.model';

export interface CheckerFunctionParamsType {
  (i_or_cockt_id: number,
   ing_name: string,
   ing_volume: string,
   IngsModel: typeof Ings,
   VolumesModel: typeof Volumes,
   CocktsIngsVolumesModels: typeof Cockts_ings_volumes,
   cycle: boolean,
   newCockt?: Cockts): void
}