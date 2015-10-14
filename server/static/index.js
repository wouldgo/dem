/*global __dirname,module,require*/
(function withModule(__dirname, module, require) {
  'use strict';

  var path = require('path')
    , baseWWWFolder = '../../www'
    , libFolder = path.resolve(__dirname, baseWWWFolder, 'lib')
    , htmlIndexFile = path.resolve(__dirname, baseWWWFolder, 'index.html')
    , distFolder = path.resolve(__dirname, baseWWWFolder, 'dist')
    , jsFolder = path.resolve(__dirname, baseWWWFolder, 'js')
    , cssFolder = path.resolve(__dirname, baseWWWFolder, 'css')
    , templatesFolder = path.resolve(__dirname, baseWWWFolder, 'templates')
    , requireJSBootFile = path.resolve(__dirname, baseWWWFolder, 'require-boot.js')
    , routesJsonFile = path.resolve(__dirname, baseWWWFolder, 'routes.json')
    , getHtmlFile = {
        'method': 'GET',
        'path': '/{path*}',
        'config': {
          'auth': false
        },
        'handler': {
          'file': htmlIndexFile
        }
      }
    , getRoutesJsonFile = {
        'method': 'GET',
        'path': '/routes.json',
        'config': {
          'auth': false
        },
        'handler': {
          'file': routesJsonFile
        }
      }
    , getRequireJSBootFile = {
        'method': 'GET',
        'path': '/require-boot.js',
        'config': {
          'auth': false
        },
        'handler': {
          'file': requireJSBootFile
        }
      }
    , getCssFolder = {
        'method': 'GET',
        'path': '/css/{param*}',
        'config': {
          'auth': false
        },
        'handler': {
          'directory': {
            'path': cssFolder,
            'listing': false
          }
        }
      }
    , getLibFolder = {
        'method': 'GET',
        'path': '/lib/{param*}',
        'config': {
          'auth': false
        },
        'handler': {
          'directory': {
            'path': libFolder,
            'listing': false
          }
        }
      }
    , getDistFolder = {
        'method': 'GET',
        'path': '/dist/{param*}',
        'config': {
          'auth': false
        },
        'handler': {
          'directory': {
            'path': distFolder,
            'listing': false
          }
        }
      }
    , getJsFolder = {
        'method': 'GET',
        'path': '/js/{param*}',
        'config': {
          'auth': false
        },
        'handler': {
          'directory': {
            'path': jsFolder,
            'listing': false
          }
        }
      }
    , getTemplatesFolder = {
        'method': 'GET',
        'path': '/templates/{param*}',
        'config': {
          'auth': false
        },
        'handler': {
          'directory': {
            'path': templatesFolder,
            'listing': false
          }
        }
      };

  module.exports = [
    getHtmlFile,
    getRoutesJsonFile,
    getCssFolder,
    getRequireJSBootFile,
    getLibFolder,
    getJsFolder,
    getTemplatesFolder,
    getDistFolder
  ];
}(__dirname, module, require));
