import { ConfigObject } from '@nestjs/config/dist/types/config-object.type';
import { registerAs } from '@nestjs/config';

export const createConfig = <T extends ConfigObject>(
  token: string,
  configFactory: () => T,
) => {
  return {
    token: token,
    register: registerAs(token, configFactory),
  };
};
