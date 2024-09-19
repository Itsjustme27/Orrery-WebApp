import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import getStarField from '../Star/getStarField';



export default function Earth() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    const renderer = new THREE.WebGLRenderer({
        antialias : true
    });

    renderer.setSize(width, height);
    document.body.appendChild(renderer.domElement);



    const fov = 75;
    const aspect = width / height;
    const near = 0.1;
    const far = 1000;

    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 5;
    
    const scene = new THREE.Scene();

    const earthGroup = new THREE.Group();
    earthGroup.rotation.z = -23.4 * Math.PI / 180;
    scene.add(earthGroup);
    const detail = 12;
    const starField = getStarField();       
    scene.add(getStarField());

    const loader = new THREE.TextureLoader();
    const geometry = new THREE.IcosahedronGeometry(1, detail);
    const material = new THREE.MeshStandardMaterial({
        
        // color: 0xccff,
        // flatShading: true

        map: loader.load("./src/assets/earthmap1k.jpg")
    });

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.03;

    const earthMesh = new THREE.Mesh(geometry, material);
    scene.add(earthMesh);

    const wireMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true
    });

    const lightMat = new THREE.MeshBasicMaterial({
        // color: 0xffffff,
        // transparent: true,
        // opacity: 0.6,
        map: loader.load('./src/assets/earthlights1k.jpg'),
        blending: THREE.AdditiveBlending
    });
    const lightMesh = new THREE.Mesh(geometry, lightMat);
    scene.add(lightMesh);

    // const cloudMat = new THREE.MeshBasicMaterial({
    //     map: loader.load('./src/assets/earthcloudmap.jpg'),
    //     blending: THREE.AdditiveBlending
 
    // });
    // const cloudMesh = new THREE.Mesh(geometry, cloudMat);
    // scene.add(cloudMesh);

    // const wireMesh =  new THREE.Mesh(geometry, wireMat);
    // earthMesh.add(wireMesh);

    // const hemiLight = new THREE.HemisphereLight(0xffffff, 0x000000);
    // scene.add(hemiLight);

    const sunLight = new THREE.DirectionalLight(0xffffff);
    sunLight.position.set(-2, -0.5, 1.5);
    scene.add(sunLight);

  function animate() {
        requestAnimationFrame(animate);
        earthMesh.rotation.y += 0.002;
        lightMesh.rotation.y += 0.002;
        // cloudMesh.rotation.y += 0.002;
        renderer.render(scene, camera);
    }

    animate();
}