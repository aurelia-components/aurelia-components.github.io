import {inject} from 'aurelia-framework';
import {RoutesConfig} from './routes-config';

@inject(RoutesConfig)
export class App {
  constructor(routesConfig) {
    this.routesConfig = routesConfig;
  }

  configureRouter(config, router) {
    //config.options.pushState = true;
    //config.title = this.i18n.tr('config.pageTitle');
    //config.addPipelineStep('authorize', AccessRightsAuthorizeStep);
    config.map(this.routesConfig.getRoutes());
    config.mapUnknownRoutes('./not-found', 'not-found');

    this.router = router;
  }
}
