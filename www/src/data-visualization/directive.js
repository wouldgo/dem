import THREE from 'three';
import d3 from 'd3';
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

/*eslint-disable one-var*/
export const sectionDirective = /*@ngInject*/ function sectionDirective() {
  /*eslint-enable one-var*/
  'use strict';

  const linkingFunction = function linkingFunction($scope, element) {
    let svg
      , x
      , y
      , xAxis
      , yAxis
      , valueline
      , margin = {
        'top': 30,
        'right': 20,
        'bottom': 30,
        'left': 50
      };

    $scope.onGraphValueChange = function onGraphValueChange(array) {

      if (svg) {

        x.domain([
          d3.min(array, d => {
            return d.x;
          }),
          d3.max(array, d => {
            return d.x;
          })
        ]);
        y.domain([
          d3.max(array, d => {
            return d.y;
          }),
          d3.min(array, d => {
            return d.y;
          })
        ]);

        // Select the section we want to apply our changes to
        let transition = d3.select(element[0]).transition();

        // Make the changes
        transition.select('.line')
            .duration(150)
            .attr('d', valueline(array));
        transition.select('.x.axis')
            .duration(150)
            .call(xAxis);
        transition.select('.y.axis')
            .duration(150)
            .call(yAxis);
      } else {
        let width = array.length - margin.left - margin.right
          , height = 300 - margin.top - margin.bottom;

        x = d3.scale.linear().range([0, width]);
        y = d3.scale.linear().range([0, height]);
        xAxis = d3.svg.axis().scale(x)
          .orient('bottom')
          .ticks(0);
        yAxis = d3.svg.axis().scale(y)
          .orient('left')
          .tickFormat(tickValue => {

            return `${tickValue} m`;
          })
          .ticks(5);
        valueline = d3.svg.line()
          .x(d => {

            return x(d.x);
          })
          .y(d => {

            return y(d.y);
          });
        svg = d3.select(element[0])
          .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
          .append('g')
            .attr('transform', `translate(${margin.left}, ${margin.top})`);

        x.domain([
          d3.min(array, d => {
            return d.x;
          }),
          d3.max(array, d => {
            return d.x;
          })
        ]);
        y.domain([
          d3.max(array, d => {
            return d.y;
          }),
          d3.min(array, d => {
            return d.y;
          })
        ]);

        svg.append('path')
          .attr('class', 'line')
          .attr('d', valueline(array));

        svg.append('g')
          .attr('class', 'x axis')
          .attr('transform', `translate(0, ${height})`)
          .call(xAxis);

        svg.append('g')
          .attr('class', 'y axis')
          .call(yAxis);
      }
    };
  }
  , controller = /*@ngInject*/ function controller($rootScope, $scope) {

    this.graphValues = [];
    const unregisterPointArrived = $rootScope.$on('dem:new-points', (eventInfo, payload) => {

      if (payload &&
        payload.currentRow &&
        payload.points &&
        !isNaN(payload.currentRow) &&
        Array.isArray(payload.points)) {

        payload.points.forEach((anElement, index) => {

          if (anElement &&
            (!this.graphValues[index] || anElement[2] > this.graphValues[index].y)) {

            this.graphValues[index] = {
              'x': index,
              'y': anElement[2]
            };
          }
        });

        this.graphValues.filter((anElement) => {

          if (anElement) {

            return anElement;
          }
        });
        $scope.onGraphValueChange(this.graphValues);
      }
    });

    $scope.$on('$destroy', () => {

      unregisterPointArrived();
    });
  };

  return {
    'restrict': 'A',
    'scope': {},
    'bindToController': {},
    'controllerAs': 'sectionCtrl',
    'controller': controller,
    'link': linkingFunction
  };
};
