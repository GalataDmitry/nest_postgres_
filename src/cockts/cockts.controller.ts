import { Body, Controller, Get, Post } from '@nestjs/common';
import { CocktsService } from './cockts.service';
import { CocktsDto, DescsDto } from '../dto/dto';

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
      desc
    } = addCocktDto;
    return this.CocktsService.addCocktail({cockt_name, desc})
  }

  @Post('/add_desc')
  addDescription(@Body() addDescDto: DescsDto) {
    const {desc} = addDescDto
    return this.CocktsService.addDescription(desc)
  }
}
