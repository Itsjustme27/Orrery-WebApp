import sunMap from "../assets/sunmap.jpg";
import mecuryMap from "../assets/mercurymap.jpg";
import venusMap from "../assets/venusmap.jpg";
import earthMap from "../assets/earthmap1k.jpg";
import * as THREE from 'three';
import getStarField from '../Star/getStarField';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export default function Solar() {
    const width = window.innerWidth;
    const height = window.innerHeight;  

    const renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(width, height);
    document.body.appendChild(renderer.domElement);

    const fov = 45;
    const aspect = width / height;
    const near = 0.1;
    const far = 1000;

    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(-90, 140, 140);


    const scene = new THREE.Scene();

    // const detail = 12;
    const starField = getStarField();
    scene.add(starField);

    const loader = new THREE.TextureLoader();

    // Sun 
    const sunGeo = new THREE.SphereGeometry(16, 30, 30);
    const sunMat = new THREE.MeshStandardMaterial({
        emissive: new THREE.Color(0xFFFFBD),
        map: loader.load(sunMap)
    });

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.03;

    const sunMesh = new THREE.Mesh(sunGeo, sunMat);
    scene.add(sunMesh);


    function createPlanets(size, map, position) {
        const geo = new THREE.SphereGeometry(size, 30, 30);
        const mat = new THREE.MeshBasicMaterial({
            map: loader.load(map)
        });

        const mesh = new THREE.Mesh(geo, mat);
        sunMesh.add(mesh);
        mesh.position.x = position;

        const obj = new THREE.Object3D();
        obj.add(mesh);
        scene.add(obj);
        return {mesh, obj};
    }

    const mercury = createPlanets(3.2, mecuryMap, 28)
    const venus = createPlanets(5.8, venusMap, 44);
    const earth = createPlanets(6, earthMap, 62);


    function animate() {
        requestAnimationFrame(animate);
        // Self-Rotation
        sunMesh.rotateY(0.004);
        mercury.mesh.rotateY(0.004);
        venus.mesh.rotateY(0.002);
        earth.mesh.rotateY(0.02);

        // Revolve around sun
        mercury.obj.rotateY(0.04);
        venus.obj.rotateY(0.015);
        earth.obj.rotateY(0.02);
        renderer.render(scene, camera);
    }
    animate();  
}