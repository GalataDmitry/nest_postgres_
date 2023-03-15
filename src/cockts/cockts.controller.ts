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
      ing_name
    } = addCocktDto;
    return this.CocktsService.addCocktail({cockt_name, desc, ing_name})
  }

  @Post('/add_desc')
  addDescription(@Body() addDescDto: DescsDto) {
    const {desc} = addDescDto
    return this.CocktsService.addDescription(desc)
  }

  @Post('/add_ingredient')
  addIngredient(@Body() addIngDto: IngsDto) {
    const {ing_name} = addIngDto
    return this.CocktsService.addIngredient(ing_name)
  }
}
