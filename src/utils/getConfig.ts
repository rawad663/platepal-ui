import { dev, prod } from '@root/config';

const { NODE_ENV } = process.env;

export const ENV = {
  production: 'production',
  dev: 'development',
};

export const getConfig = () => (NODE_ENV === ENV.production ? prod : dev);
