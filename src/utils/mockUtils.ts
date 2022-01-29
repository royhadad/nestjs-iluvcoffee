import { Repository } from 'typeorm';

export type MockRepository<T> = Partial<
  Record<keyof Repository<T>, jest.Mock<T, any>>
>;

// should add more mock methods here
export const createMockRepository = <T>(): MockRepository<T> => ({
  findOne: jest.fn(),
  create: jest.fn(),
});
