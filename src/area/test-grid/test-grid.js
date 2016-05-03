import {ChildRouter} from 'libs/child-router/child-router';
import {inject, useView} from 'aurelia-framework';

@useView('libs/child-router/tabs-router.html')
//@useView('libs/child-router/child-router.html')
export class TestGrid extends ChildRouter {
  constructor() {
    super();
    this.navModel = [{
      route: '',
      redirect: 'auto-height-parent-based'
    }, {
      route: 'auto-height-parent-based',
      name: 'auto-height-parent-based',
      moduleId: './auto-height-parent-based/auto-height-parent-based',
      title: 'auto',
      nav: true
    }, {
      route: 'columns-metadata',
      name: 'columns-metadata',
      moduleId: './columns-metadata/columns-metadata',
      title: 'columns metadata',
      nav: true
    }, {
      route: 'fixed-height',
      name: 'fixed-height',
      moduleId: './fixed-height/fixed-height',
      title: 'fixed height',
      nav: true
    }, {
      route: 'pagination',
      name: 'pagination',
      moduleId: './pagination/pagination',
      title: 'pagination',
      nav: true
    }, {
      route: 'pagination-remote',
      name: 'pagination-remote',
      moduleId: './pagination-remote/pagination-remote',
      title: 'pagination remote',
      nav: true
    }, {
      route: 'filters',
      name: 'filters',
      moduleId: './filters/filters',
      title: 'filters',
      nav: true
    }];
  }
}
