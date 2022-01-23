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
  UsePipes,
  ValidationPipe,
  // Res,
} from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { COFFEE_BRANDS } from './coffees.constants';
import { Public } from '../common/decorators/public.decorator';
import { ParseIntPipe } from '../common/pipes/parse-int.pipe';
import { Protocol } from '../common/decorators/protocol.decorator';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('coffees')
@UsePipes(ValidationPipe)
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
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Public()
  @UsePipes(ValidationPipe)
  @Get()
  async findAll(
    @Protocol('https') protocol,
    @Query() paginationQuery: PaginationQueryDto,
  ) {
    // console.log(protocol); // we can log the protocol from the @Protocol decorator
    return this.coffeesService.findAll(paginationQuery);
  }

  @ApiResponse({ status: 404, description: 'Coffee #N not found' })
  @Get(':id')
  // @HttpCode(HttpStatus.GONE) // to set a constant response http code
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.coffeesService.findOne(id);
  }

  @Post()
  create(@Body() createCoffeeDto: CreateCoffeeDto) {
    return this.coffeesService.create(createCoffeeDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body(ValidationPipe)
    updateCoffeeDto: UpdateCoffeeDto,
  ) {
    return this.coffeesService.update(id, updateCoffeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.coffeesService.remove(id);
  }
}
