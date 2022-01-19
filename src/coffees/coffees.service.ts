import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@Injectable()
export class CoffeesService {
  private coffees: Coffee[] = [
    {
      id: '123',
      name: 'Shipwreck Roast',
      brand: 'buddy brew',
      flavors: ['chocolate', 'vanilla'],
    },
  ];

  findAll(): Coffee[] {
    return this.coffees;
  }

  findOne(id: string) {
    const coffee = this.coffees.find((item) => item.id === id);
    if (!coffee) {
      // throw new HttpException(`Coffee #${id} not found`, HttpStatus.NOT_FOUND);
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return coffee;
  }
  create(createCoffeeDto: CreateCoffeeDto) {
    this.coffees.push({ id: '1', ...createCoffeeDto });
  }
  update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
    const existingCoffee = this.findOne(id);
    if (existingCoffee) {
      // update existing coffee
    }
  }
  remove(id: string) {
    const coffeeIndex = this.coffees.findIndex((item) => item.id === id);
    if (coffeeIndex !== -1) {
      this.coffees.splice(coffeeIndex, 1);
    }
  }
}
