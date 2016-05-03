//import {accessRight} from 'enum/access-right';

export class RoutesConfig {
  getRoutes() {
    return [{
      route: '',
      //redirect: 'test-grid'
      redirect: 'test'
    }, {
      route: 'test',
      name: 'test',
      moduleId: './area/test',
      nav: true,
      title: 'Test'
    // }, {
    //   route: 'test-assign',
    //   name: 'test-assign',
    //   moduleId: './area/test-assign/test-assign',
    //   nav: true,
    //   title: 'Test Assign'
    // }, {
    //   route: 'test-split',
    //   name: 'test-split',
    //   moduleId: './area/test-split/test-split',
    //   nav: true,
    //   title: 'Test Splitter'
    // }, {
    //   route: 'test-popover',
    //   name: 'test-popover',
    //   moduleId: './area/test-popover/test-popover',
    //   nav: true,
    //   title: 'Test Popover'
    // }, {
    //   route: 'test-select3',
    //   name: 'test-select3',
    //   moduleId: './area/test-select3/test-select3',
    //   nav: true,
    //   title: 'Test Select3'
    }, {
      route: 'test-grid',
      name: 'test-grid',
      moduleId: './area/test-grid/test-grid',
      nav: true,
      title: 'Test Grid'
    // }, {
	 //  route: 'test-date-time-picker',
    //   name: 'test-date-time-picker',
    //   moduleId: './area/test-date-time-picker/test-date-time-picker',
    //   nav: true,
    //   title: 'Test Date Time Picker'
    // }, {
    //   route: 'test-tree-view',
    //   name: 'test-tree-view',
    //   moduleId: './area/test-treeview//test-treeview',
    //   nav: true,
    //   title: 'Test TreeView'
    }];
  }
}
