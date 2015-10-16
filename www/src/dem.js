import angular from 'angular';
import 'angular-material';
import 'ui-router';
import 'ocLazyLoad';
import applicationConfiguration from './conf/app-conf.js';
import router from './common/router.js';
import routes from './routes.json!';

let demApplication = angular.module('dem', [
    'ui.router',
    'oc.lazyLoad',
    'ngMaterial'
  ]);

demApplication.config(router(demApplication, routes))
  .config(applicationConfiguration);

export default demApplication;
