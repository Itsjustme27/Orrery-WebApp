import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import getStarField from '../Star/getStarField';



export default function Sun() {
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

    const sunGroup = new THREE.Group();
    sunGroup.rotation.z = -23.4 * Math.PI / 180;
    scene.add(sunGroup);
    const detail = 12;
    const starField = getStarField();       
    scene.add(getStarField());

    const loader = new THREE.TextureLoader();
    const geometry = new THREE.IcosahedronGeometry(1, detail);
    const material = new THREE.MeshStandardMaterial({
        
        // color: 0xccff,
        // flatShading: true

        map: loader.load("./src/assets/sunmap.jpg"),
        emissive: new THREE.Color(0xFFFFBD),          //  Emissive color for glowing
        emissiveIntensity: 1
    });

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.03;

    const sunMesh = new THREE.Mesh(geometry, material);
    sunMesh.scale.set(2,2,2);   // Setting it's size to be bigger than other planets
    scene.add(sunMesh);

    const wireMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true
    });

    const lightMat = new THREE.MeshBasicMaterial({
        // color: 0xffffff,
        // transparent: true,
        // opacity: 0.6,
        map: loader.load('./src/assets/sunmap.jpg'),
        blending: THREE.AdditiveBlending
    });
    const lightMesh = new THREE.Mesh(geometry, lightMat);
    scene.add(lightMesh);

    //Adding bloom effect
    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    const bloomPass = new UnrealBloomPass(
        new THREE.Vector2(width, height),
        1.5,          // Strength
        0.4,          // Radius
        0.85          // Threshold
    );
    composer.addPass(bloomPass);

  function animate() {
        requestAnimationFrame(animate);
        sunMesh.rotation.y += 0.002;
        lightMesh.rotation.y += 0.002;
        // cloudMesh.rotation.y += 0.002;
        controls.update();
        composer.render();
    }

    animate();
}