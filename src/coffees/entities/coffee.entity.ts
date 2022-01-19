import {
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  JoinTable,
  Index,
} from 'typeorm';
import { Flavor } from './flavor.entity';

@Index(['name', 'recommendations']) // Composite indices at the top of the entity
@Index(['name', 'brand']) // You can have multiple of those
@Entity() // sql table === 'coffee'
export class Coffee {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  brand: string;

  @Column({ default: 0 })
  recommendations: number;

  @JoinTable()
  @ManyToMany((type) => Flavor, (flavor) => flavor.coffees, {
    cascade: true, // ['insert']
  })
  flavors: Flavor[];
}
