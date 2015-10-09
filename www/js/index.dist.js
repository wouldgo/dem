(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', './renderer.js'], factory);
  } else if (typeof exports !== 'undefined') {
    factory(exports, require('./renderer.js'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.kickOff);
    global.index = mod.exports;
  }
})(this, function (exports, _rendererJs) {
  /*global console*/
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _kickOff = _interopRequireDefault(_rendererJs);

  (function inBrowser() {
    'use strict';

    console.log(_kickOff['default']);
  })();
});
(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', '../lib/three.js/three.js', '../lib/jquery/dist/jquery.min.js'], factory);
  } else if (typeof exports !== 'undefined') {
    factory(exports, require('../lib/three.js/three.js'), require('../lib/jquery/dist/jquery.min.js'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.THREE, global.$);
    global.renderer = mod.exports;
  }
})(this, function (exports, _libThreeJsThreeJs, _libJqueryDistJqueryMinJs) {
  /*global window*/
  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _THREE = _interopRequireDefault(_libThreeJsThreeJs);

  var _$ = _interopRequireDefault(_libJqueryDistJqueryMinJs);

  // set the scene size
  var WIDTH = 640,
      HEIGHT = 480,

  // set some camera attributes
  VIEW_ANGLE = 45,
      ASPECT = WIDTH / HEIGHT,
      NEAR = 0.1,
      FAR = 10000,

  // get the DOM element to attach to
  $container = (0, _$['default'])('#container'),

  // create a WebGL renderer, camera
  // and a scene
  renderer = new _THREE['default'].WebGLRenderer(),
      camera = new _THREE['default'].PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR),
      scene = new _THREE['default'].Scene(),
      territoryGeometry = new _THREE['default'].Geometry(),
      planeMaterial = new _THREE['default'].MeshBasicMaterial({
    'color': 0xffff00,
    'side': _THREE['default'].DoubleSide
  }),
      plane = new _THREE['default'].Mesh(territoryGeometry, planeMaterial),

  // create a point light
  pointLight = new _THREE['default'].PointLight(0xFFFFFF);

  // add the camera to the scene
  scene.add(camera);

  // the camera starts at 0,0,0
  // so pull it back
  camera.position.z = 300;

  // start the renderer
  renderer.setSize(WIDTH, HEIGHT);

  // attach the render-supplied DOM element
  $container.append(renderer.domElement);

  territoryGeometry.vertices.push(new _THREE['default'].Vector3(-10, 10, 0), new _THREE['default'].Vector3(-10, -10, 0), new _THREE['default'].Vector3(10, -10, 0));

  territoryGeometry.faces.push(new _THREE['default'].Face3(0, 1, 2));

  territoryGeometry.computeBoundingSphere();

  scene.add(plane);

  // set its position
  pointLight.position.x = 10;
  pointLight.position.y = 50;
  pointLight.position.z = 130;

  // add to the scene
  scene.add(pointLight);

  var kickOff = function kickOff() {

    //draw
    window.requestAnimationFrame(function updateTick() {

      renderer.render(scene, camera);
    });
  };
  exports.kickOff = kickOff;
});
