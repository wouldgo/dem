import angular from 'angular';
import 'angular-material';
import 'ui-router';
import 'ocLazyLoad';
import 'angular-comunicator';
import 'lib/angular-material/angular-material.min.css!';
import '../style/styles.css!';
import applicationConfiguration from './conf.js';
import {router, stateEventsHandler} from '../common/router.js';
import values from '../values/index.js';
import identification from '../identification/index.js';

let demApplication = angular.module('dem', [
    'ui.router',
    'oc.lazyLoad',
    'ngMaterial',
    '720kb.comunicator',
    values.name,
    identification.name
  ]);

demApplication.config(router(demApplication))
  .config(applicationConfiguration)
  .run(stateEventsHandler);

export default demApplication;
