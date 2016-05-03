import {Config} from './config';

export {Logger} from './logger';

export function configure(aurelia, configCallback) {
  const config = new Config();

  if (configCallback !== undefined && typeof(configCallback) === 'function') {
    configCallback(config);
  }
}
