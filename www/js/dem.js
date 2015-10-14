import angular from 'angular';
import 'ui-router';
import 'ocLazyLoad';
import applicationConfiguration from './conf/app-conf.js';
import router from './common/router.js';
import routes from '../../js/routes.json!';

/*{
  'url': '/',
  'controller': 'mainCtrl',
  'template': "<p>Hello {{name}}. Would you like to... <a href='renderer'>load lazy</a>?</p>"
}

'renderer', {
  'url': '/renderer',
  'controller': 'RendererCtrl',
  'templateUrl': 'templates/renderer.html',
  'resolve': {
    '_loadCtrl': function loadCtrl($ocLazyLoad) {

      return $ocLazyLoad.inject({
        'name': 'dem.renderer',
        'files': [
          './dist/renderer'
        ]
      });
    }
  }
}

*/

let demApplication = angular.module('dem', [
    'ui.router',
    'oc.lazyLoad'
  ]);

demApplication.config(router(demApplication, routes))
  .config(applicationConfiguration);

export default demApplication;
