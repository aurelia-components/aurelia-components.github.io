import 'bootstrap';

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    //.plugin('aurelia-animator-css')
    .plugin('aurelia-components/grid')
    .feature('features/service', (config) => {
      config.setLoggerService({
        positionClass: 'toast-top-right'
      });
    })
    .feature('features/utils')
    .feature('features/value-converters')
    .feature('features/elements/tabs');

  aurelia.start().then(a => a.setRoot());
}
