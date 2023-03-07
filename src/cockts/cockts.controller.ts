import { Controller, Get, Post } from '@nestjs/common';
import { CocktsService } from './cockts.service';

@Controller('/api')
export class CocktsController {
  constructor(readonly CocktsService: CocktsService) {}

  @Get('/get_all_cockts')
  getAllCocktails() {
     return this.CocktsService.getAllCocktails();
  };

  @Post('/add_cockt')
  addCocktail() {
    return this.CocktsService.addCocktail()
  }
}
