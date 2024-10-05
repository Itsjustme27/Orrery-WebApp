import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import getStarField from '../Star/getStarField';


export default function Mercury() {
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

    const mercuryGroup = new THREE.Group();
    mercuryGroup.rotation.z = 0.034 * Math.PI / 180;
    scene.add(mercuryGroup);
    
    const detail = 12;
    const starField = getStarField();       
    scene.add(getStarField());

    const loader = new THREE.TextureLoader();
    const geometry = new THREE.IcosahedronGeometry(1, detail);
    const material = new THREE.MeshStandardMaterial({
        
        // color: 0xccff,
        // flatShading: true

        map: loader.load("./src/assets/mercurymap.jpg"),
        roughness: 0.5,
        metalness: 0.1
    });

    // Ambient light for base illumination
    const ambientLight = new THREE.AmbientLight(0x404040, 1);
    scene.add(ambientLight);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.03;

    const mercuryMesh = new THREE.Mesh(geometry, material);
    mercuryMesh.scale.set(0.1, 0.1, 0.1); 
    scene.add(mercuryMesh);

    const wireMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true
    });


    const sunLight = new THREE.DirectionalLight(0xffffff, 1);
    sunLight.position.set(10, 10, 10);
    scene.add(sunLight);

  function animate() {
        requestAnimationFrame(animate);
        mercuryMesh.rotation.y += 0.002;
        // cloudMesh.rotation.y += 0.002;
        renderer.render(scene, camera);
    }

    animate();
}