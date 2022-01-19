import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  // Res,
} from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { COFFEE_BRANDS } from './coffees.constants';

@Controller('coffees')
export class CoffeesController {
  constructor(
    private readonly coffeesService: CoffeesService,
    @Inject(COFFEE_BRANDS) private readonly coffeeBrands: string[],
  ) {}

  // basic GET
  // @Get('flavors')
  // findAll() {
  //   return 'this action returns all coffees';
  // }

  // caveman implementation - gives us access to the underlying library implementation
  // @Get('flavors')
  // findAll(@Res() response) {
  //   response.status(200).send('this action returns all coffees');
  // }

  // GET with query
  @Get('flavors')
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    // const { limit, offset } = paginationQuery;
    return this.coffeesService.findAll(paginationQuery);
  }

  @Get(':id')
  // @HttpCode(HttpStatus.GONE) // to set a constant response http code
  findOne(@Param('id') id: number) {
    return this.coffeesService.findOne(id);
  }

  @Post()
  create(@Body() createCoffeeDto: CreateCoffeeDto) {
    return this.coffeesService.create(createCoffeeDto);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateCoffeeDto: UpdateCoffeeDto) {
    return this.coffeesService.update(id, updateCoffeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.coffeesService.remove(id);
  }
}
