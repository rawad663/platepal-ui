import { dev, prod } from '@root/config';

const { NODE_ENV } = process.env;

export const getConfig = () => (NODE_ENV === 'production' ? dev : prod);
