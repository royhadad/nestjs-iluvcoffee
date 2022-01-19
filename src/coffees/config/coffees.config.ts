import { registerAs } from '@nestjs/config';

export const coffeesConfig = registerAs('coffees', () => ({
  foo: 'bar',
}));
