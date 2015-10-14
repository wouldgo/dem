import angular from 'angular';
import applicationConfiguration from './conf/app-conf';
import 'ui-router';
import 'ocLazyLoad';
import router from './common/router';

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

let routes = [
      {
        'stateName': 'home',
        'urlPrefix': '/',
        'type': 'load',
        'src': 'dist/home/home.js'
      },
      {
        'stateName': 'renderer',
        'urlPrefix': '/renderer',
        'type': 'load',
        'src': './dashboard/dashboard'
      },
      {
        'stateName': 'admin',
        'urlPrefix': '/admin',
        'type': 'load',
        'src': 'app/admin/admin'
      },
      {
        'stateName': 'forms',
        'urlPrefix': '/forms',
        'type': 'load',
        'src': 'app/forms/forms'
      }
    ]
  , demApplication = angular.module('dem', [
    'ui.router',
    'oc.lazyLoad'
  ]);

demApplication.config(router(demApplication, routes))
  .config(applicationConfiguration);

export default demApplication;
