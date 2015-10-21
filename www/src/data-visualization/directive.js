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
      , ambientLight = new THREE.AmbientLight(0x000000)
      , pointLight = new THREE.PointLight(0xffffff, 1, 0)
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

          let material = new THREE.MeshLambertMaterial({
              'color': 0x0f0f0f,
              'wireframe': true,
              'wireframeLinewidth': 0.5,
              'vertexColors': THREE.VertexColors,
              'fog': true,
              'reflectivity': 0,
              'refractionRatio': 0
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
    pointLight.shadowCameraVisible = true;
    renderer.setSize(WIDTH, HEIGHT);
    scene.add(camera);
    scene.add(ambientLight);
    scene.add(pointLight);
    element.append(renderer.domElement);

    $scope.setCameraPosition = function setCameraPosition(xAxis, yAxis, zAxis) {

      camera.position.set(xAxis, yAxis, zAxis);
    };

    $scope.setLightPosition = function setLightPosition(xAxis, yAxis, zAxis) {

      pointLight.position.set(xAxis, yAxis, zAxis);
    };

    $scope.$on('$destroy', () => {

      unregisterWatcherOnGeometry();
      element.html('');
    });
  }
  , controller = /*@ngInject*/ function controller($rootScope, $scope) {

    this.counter = 0;
    this.maxZValue = 0;
    const unregisterMaxPoints = $rootScope.$on('dem:max-points', (eventInfo, maxPoints) => {

      this.geometry = new THREE.PlaneGeometry(maxPoints[0], maxPoints[1], maxPoints[0] - 1, maxPoints[1] - 1);
      this.geometryLength = this.geometry.vertices.length;
    })
    , unregisterPointArrived = $rootScope.$on('dem:new-points', (eventInfo, payload) => {

      if (this.counter <= this.geometryLength) {

        if (payload &&
          payload.currentRow &&
          payload.points &&
          !isNaN(payload.currentRow) &&
          Array.isArray(payload.points)) {

          for (let aPoint of payload.points) {
            let vertexToPut = aPoint[2] / 1000 * 100;

            this.geometry.vertices[this.counter].z = vertexToPut;
            if (vertexToPut + 200 > this.maxZValue) {

              this.maxZValue = vertexToPut + 200;
              $scope.setLightPosition(0, 0, this.maxZValue);
              $scope.setCameraPosition(-10, -300, this.maxZValue);
            }
            this.counter += 1;
          }
          this.geometry.verticesNeedUpdate = true;
        }
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
