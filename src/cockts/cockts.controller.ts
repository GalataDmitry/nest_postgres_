import { Body, Controller, Get, Post } from '@nestjs/common';
import { CocktsService } from './cockts.service';
import { CocktsDto, DescsDto, IngsDto } from '../dto/dto';

@Controller('/api')
export class CocktsController {
  constructor(readonly CocktsService: CocktsService) {}

  @Get('/get_all_cockts')
  getAllCocktails() {
     return this.CocktsService.getAllCocktails();
  };

  @Post('/add_cockt')
  addCocktail(@Body() addCocktDto: CocktsDto) {
    const {
      cockt_name,
      desc,
      ing_name,
      ing_volume
    } = addCocktDto;
    return this.CocktsService.addCocktail({cockt_name, desc, ing_name, ing_volume})
  }

  @Post('/update_desc')
  updateDescription(@Body() updateDescDto: DescsDto) {
    const {desc, cockt_id} = updateDescDto
    return this.CocktsService.updateDescription({desc, cockt_id})
  }

  @Post('/add_ingredient_and_volume')
  addIngredient(@Body() addIngDto: IngsDto) {
    const {ing_name, cockt_id, ing_volume} = addIngDto
    return this.CocktsService.addIngredientAndVolume({ ing_name, cockt_id, ing_volume })
  }
}
