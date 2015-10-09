/*global window*/
import THREE from 'three';
import $ from 'jquery';

// set the scene size
const WIDTH = 640
    , HEIGHT = 480
    // set some camera attributes
    , VIEW_ANGLE = 45
    , ASPECT = WIDTH / HEIGHT
    , NEAR = 0.1
    , FAR = 10000
    // get the DOM element to attach to
    , $container = $('#container')
    // create a WebGL renderer, camera
    // and a scene
    , renderer = new THREE.WebGLRenderer()
    , camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR)
    , scene = new THREE.Scene()
    , territoryGeometry = new THREE.Geometry()
    , planeMaterial = new THREE.MeshBasicMaterial({
        'color': 0xffff00,
        'side': THREE.DoubleSide
      })
    , plane = new THREE.Mesh(territoryGeometry, planeMaterial)
    // create a point light
    , pointLight = new THREE.PointLight(0xFFFFFF)
    , kickOff = function kickOff() {
      'use strict';

      //draw
      window.requestAnimationFrame(function updateTick() {

        renderer.render(scene, camera);
      });
    };

// add the camera to the scene
scene.add(camera);

// the camera starts at 0,0,0
// so pull it back
camera.position.z = 300;

// start the renderer
renderer.setSize(WIDTH, HEIGHT);

// attach the render-supplied DOM element
$container.append(renderer.domElement);

territoryGeometry.vertices.push(
  new THREE.Vector3(-10, 10, 0),
  new THREE.Vector3(-10, -10, 0),
  new THREE.Vector3(10, -10, 0)
);

territoryGeometry.faces.push( new THREE.Face3( 0, 1, 2 ) );

territoryGeometry.computeBoundingSphere();

scene.add(plane);

// set its position
pointLight.position.x = 10;
pointLight.position.y = 50;
pointLight.position.z = 130;

// add to the scene
scene.add(pointLight);

export default kickOff;
