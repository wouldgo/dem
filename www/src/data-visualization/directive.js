import THREE from 'three';
import 'threejs-orbit-controls';
import angular from 'angular';

export const threejsDirective = /*@ngInject*/ function threejsDirective($log, $window) {
  'use strict';

  const linkingFunction = function linkingFunction($scope, element) {

    const RATIO = 0.8
      , WIDTH = angular.element($window).width() * RATIO
      , HEIGHT = angular.element($window).height() * RATIO
      , VIEW_ANGLE = 45
      , ASPECT = WIDTH / HEIGHT
      , NEAR = 0.1
      , FAR = 10000
      , renderer = new THREE.WebGLRenderer({
        'alpha': true
      })
      , camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR)
      , scene = new THREE.Scene()
      , pointLight = new THREE.DirectionalLight(0x000000, 1)
      , controls = new THREE.OrbitControls(camera, renderer.domElement)
      , kickOff = function kickOff() {

        controls.update();
        $window.requestAnimationFrame(kickOff);
        renderer.render(scene, camera);
      }
      , geometryWatchingFunction = function geometryWatchingFunction() {

        return $scope.threeCtrl.geometry;
      }
      , onGeometryChange = function onGeometryChange(newValue) {

        if (newValue) {

          let material = new THREE.MeshPhongMaterial({
              'color': 0xdddddd,
              'wireframe': true
            })
            , plane = new THREE.Mesh(newValue, material);

          plane.castShadow = true;
          plane.receiveShadow = true;
          scene.add(plane);
          kickOff();
        }
      }
      , unregisterWatcherOnGeometry = $scope.$watch(geometryWatchingFunction, onGeometryChange);

    element.width(WIDTH);
    element.height(HEIGHT);
    camera.position.set(0, 0, 500);
    pointLight.position.set(10, 50, 500);
    pointLight.shadowCameraVisible = true;
    renderer.setSize(WIDTH, HEIGHT);
    scene.add(camera);
    scene.add(pointLight);
    element.append(renderer.domElement);
    $scope.$on('$destroy', () => {

      unregisterWatcherOnGeometry();
      element.html('');
    });
  }
  , controller = /*@ngInject*/ function controller($rootScope, $scope) {

    this.counter = 0;
    const unregisterMaxPoints = $rootScope.$on('dem:max-points', (eventInfo, maxPoints) => {

      this.geometry = new THREE.PlaneGeometry(maxPoints[0], maxPoints[1], maxPoints[0] - 1, maxPoints[1] - 1);
      this.geometryLength = this.geometry.vertices.length;
    })
    , unregisterPointArrived = $rootScope.$on('dem:new-point', (eventInfo, newPoint) => {

      if (this.counter <= this.geometryLength) {

        this.geometry.vertices[this.counter].z = newPoint[2] / 1000 * 100;
        this.geometry.verticesNeedUpdate = true;
        this.counter += 1;
      } else {

        throw new Error('If you read this, there is an issue.');
      }
    });

    $scope.$on('$destroy', () => {

      unregisterMaxPoints();
      unregisterPointArrived();
    });
  };

  return {
    'restrict': 'A',
    'scope': {},
    'bindToController': {},
    'controllerAs': 'threeCtrl',
    'controller': controller,
    'link': linkingFunction
  };
};
