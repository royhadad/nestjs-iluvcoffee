import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { TestingModule, Test } from '@nestjs/testing';
import { CoffeesModule } from '../../src/coffees/coffees.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpExceptionFilter } from '../../src/common/filters/http-exception.filter';
import request from 'supertest';
import { CreateCoffeeDto } from '../../dist/coffees/dto/create-coffee.dto';
import { UpdateCoffeeDto } from '../../dist/coffees/dto/update-coffee.dto';
// import { TypeOrmModule } from '@nestjs/typeorm';

// duplicated function from main.ts, should be removed
function applyBuildingBlocksToApp(app: INestApplication): void {
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  app
    .useGlobalInterceptors
    // new WrapResponseInterceptor(), // to add the wrap response interceptor
    // new TimeoutInterceptor(), // to add the TimeoutInterceptor
    ();
}

describe('[Feature] Coffees - /coffees', () => {
  const coffee: CreateCoffeeDto = {
    name: 'Shipwreck Roast',
    brand: 'Buddy Brew',
    flavors: ['chocolate', 'vanilla'],
  };
  const expectedPartialCoffee = expect.objectContaining({
    ...coffee,
    flavors: expect.arrayContaining(
      coffee.flavors.map((name) => expect.objectContaining({ name })),
    ),
  });
  const updateCoffeeDto: UpdateCoffeeDto = {
    name: 'roy new name',
  };
  const expectedPartialCoffeeAfterPatch = expect.objectContaining({
    ...updateCoffeeDto,
  });

  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        CoffeesModule,
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5433,
          username: 'postgres',
          password: 'pass123',
          database: 'postgres',
          autoLoadEntities: true,
          synchronize: true,
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    applyBuildingBlocksToApp(app);

    await app.init();
  });

  it('Create [POST /]', () => {
    return request(app.getHttpServer())
      .post('/coffees')
      .send(coffee)
      .expect(HttpStatus.CREATED)
      .then(({ body }) => {
        expect(body).toEqual(expectedPartialCoffee);
      });
  });

  it('Get all [GET /]', () => {
    return request(app.getHttpServer())
      .get('/coffees')
      .send()
      .expect(HttpStatus.OK)
      .then(({ body }) => {
        expect(body.length).toBe(1);
        expect(body[0]).toEqual(expectedPartialCoffee);
      });
  });

  it('Get one [GET /:id]', () => {
    return request(app.getHttpServer())
      .get(`/coffees/${1}`)
      .send()
      .expect(HttpStatus.OK)
      .then(({ body }) => {
        expect(body).toEqual(expectedPartialCoffee);
      });
  });

  it('Update one [PATCH /:id]', () => {
    return request(app.getHttpServer())
      .patch(`/coffees/${1}`)
      .send(updateCoffeeDto)
      .expect(HttpStatus.OK)
      .then(({ body }) => {
        expect(body).toEqual(expectedPartialCoffeeAfterPatch);
      });
  });

  it('Delete one [DELETE /:id]', () => {
    return request(app.getHttpServer())
      .delete(`/coffees/${1}`)
      .send()
      .expect(HttpStatus.OK)
      .then(({ body }) => {
        expect(body).toEqual(expectedPartialCoffeeAfterPatch);
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
