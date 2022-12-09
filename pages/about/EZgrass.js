import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module';
import { OrbitControls } from 'https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls';

let camera, controls, scene, renderer, loader;
let plane, Ebox=[], Zbox=[], box;
var myCanvas = document.querySelector('#canvas1')
var widthHeightRatio = myCanvas.getBoundingClientRect()
const start = Date.now();

init();
animate();

function init() {

    camera = new THREE.PerspectiveCamera( 75, widthHeightRatio.width/widthHeightRatio.height, 0.1, 1000 );
    camera.position.set(5, 5, 7);

    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x161616 );

    const pointLight1 = new THREE.PointLight( 0xffffff );
    pointLight1.position.set( -4, 7, 3 );
    scene.add( pointLight1 );
    const pointLight2 = new THREE.PointLight( 0xffffff, 0.3 );
    pointLight2.position.set( 8, 0, -3 );
    scene.add( pointLight2 );

    box = new THREE.Mesh(new THREE.BoxGeometry(3,1,1), new THREE.MeshPhongMaterial({color: 0x0068b7}));
    box.position.set(0,5,0);
    Ebox.push(box);
    box = new THREE.Mesh(new THREE.BoxGeometry(1,5,1), new THREE.MeshPhongMaterial({color: 0x0068b7}));
    box.position.set(-1,3,0);
    Ebox.push(box);
    box = new THREE.Mesh(new THREE.BoxGeometry(3,1,1), new THREE.MeshPhongMaterial({color: 0x0068b7}));
    box.position.set(0,3,0);
    Ebox.push(box);
    box = new THREE.Mesh(new THREE.BoxGeometry(3,1,1), new THREE.MeshPhongMaterial({color: 0x0068b7}));
    box.position.set(0,1,0);
    Ebox.push(box);
    for (var i of Ebox) {
        scene.add(i);
    }
    box = new THREE.Mesh(new THREE.BoxGeometry(3,1,1), new THREE.MeshPhongMaterial({color: 0xea68a2}));
    box.position.set(4,5,0);
    Zbox.push(box);
    box = new THREE.Mesh(new THREE.BoxGeometry(3,1,1), new THREE.MeshPhongMaterial({color: 0xea68a2}));
    box.position.set(4,1,0);
    Zbox.push(box);
    box = new THREE.Mesh(new THREE.BoxGeometry(4.1,1,1), new THREE.MeshPhongMaterial({color: 0xea68a2}));
    box.position.set(4,3,0);
    box.rotation.set(0,0,1);
    Zbox.push(box);
    for (var i of Zbox) {
        scene.add(i);
    }

    loader = new THREE.TextureLoader();
    plane = new THREE.Mesh( new THREE.PlaneGeometry( 20, 15 ), new THREE.MeshPhongMaterial( { map: loader.load("grass_texture.jpg") }));
    plane.position.set(2,0,0);
    plane.rotation.set(- Math.PI/2,0,0);
    scene.add( plane );
    
    renderer = new THREE.WebGLRenderer({canvas: myCanvas, antialias: true});
    renderer.setSize(widthHeightRatio.width, widthHeightRatio.height);
    renderer.setPixelRatio(devicePixelRatio);
    
    controls = new OrbitControls(camera, renderer.domElement)
}

function animate() {
    requestAnimationFrame( animate );
    
    const timer = Date.now() - start;

    for (const Ebox_element of Ebox) {
        Ebox_element.position.y += Math.sin( timer * 0.008 )/80;
    }
    for (const Zbox_element of Zbox) {
        Zbox_element.position.y += Math.cos( timer * 0.008 )/80;
    }

    controls.update();

    renderer.render(scene, camera)
}