import 'bootstrap';

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    //.plugin('aurelia-animator-css')
    .feature('features/utils')
    .feature('features/elements/tabs');

  aurelia.start().then(a => a.setRoot());
}
