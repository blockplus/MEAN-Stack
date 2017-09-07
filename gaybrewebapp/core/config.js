import { configDev } from './configs/dev';
import { configProd } from './configs/prod';
const base = {
  googleAnalyticsId: 'UA-XXXXX-X',
};
export const ENV = process.env.ENVIRONMENT;
export const getConfig = () => {
  let config;
  if (ENV === 'DEV') {
    config = configDev;
  } else {
    config = configProd;
  }
  return Object.assign({}, base, config)
};
