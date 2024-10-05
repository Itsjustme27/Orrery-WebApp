import sunMap from "../assets/sunmap.jpg";
import mecuryMap from "../assets/mercurymap.jpg";
import venusMap from "../assets/venusmap.jpg";
import earthMap from "../assets/earthmap1k.jpg";
import marsMap from "../assets/mars_1k_color.jpg";
import jupiterMap from "../assets/jupitermap.jpg";
import saturnMap from "../assets/saturnmap.jpg";
import saturnRing from "../assets/saturn ring.png"
import uranusMap from "../assets/uranusmap.jpg";
import uranusRing from "../assets/uranus ring.png";
import neptuneMap from "../assets/neptunemap.jpg";
import plutoMap from "../assets/plutomap1k.jpg";
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

    // Creating planet's mesh
    function createPlanets(size, map, position, ring) {
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

        if(ring) {
            const ringGeo = new THREE.RingGeometry(
                ring.innerRadius,
                ring.outerRadius,
                32
            );
            const ringMat = new THREE.MeshBasicMaterial({
                map: loader.load(ring.texture),
                side: THREE.DoubleSide
            });
            const ringMesh = new THREE.Mesh(ringGeo, ringMat);
            obj.add(ringMesh);
            ringMesh.position.x = position;
            ringMesh.rotation.x = -0.5 * Math.PI;
        }
        
        return {mesh, obj};
        
    }

    // Planetsss
    const mercury = createPlanets(3.2, mecuryMap, 28)
    const venus = createPlanets(5.8, venusMap, 44);
    const earth = createPlanets(6, earthMap, 62);
    const mars = createPlanets(4, marsMap, 78);
    const jupiter = createPlanets(12, jupiterMap, 100);
    const saturn = createPlanets(10, saturnMap, 138, {
        innerRadius: 10,
        outerRadius: 20,
        texture: saturnRing
    });
    const uranus = createPlanets(7, uranusMap, 176, {
        innerRadius: 7,
        outerRadius: 12,
        texture: uranusRing
    });
    const neptune = createPlanets(7, neptuneMap, 200);
    const pluto = createPlanets(2.8, plutoMap, 216);

    // Orbitsss
    function createOrbit(radius) {
        const curve = new THREE.EllipseCurve(
            0, 0,            // Center of the ellipse (sun at (0, 0, 0))
            radius, radius,   // X radius, Y radius (circular orbit)
            0, 2 * Math.PI,   // Start angle, end angle
            false,            // Clockwise
            0                 // Rotation
        );
        
        const points = curve.getPoints(100);  
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
    
        const material = new THREE.LineBasicMaterial({ color: 0xffffff });
        const orbitLine = new THREE.Line(geometry, material);
    
        orbitLine.rotation.x = Math.PI / 2; 
        scene.add(orbitLine);
    }
    
    createOrbit(28);  // Orbit for Mercury
    createOrbit(44);  // Orbit for Venus
    createOrbit(62);  // Orbit for Earth
    createOrbit(78);  // Orbit for Mars
    createOrbit(100); // Orbit for Jupiter
    createOrbit(138); // Orbit for Saturn
    createOrbit(176); // Orbit for Uranus
    createOrbit(200); // Orbit for Neptune
    createOrbit(216); // Orbit for Pluto

    function animate() {
        requestAnimationFrame(animate);
        // Self-Rotation
        sunMesh.rotateY(0.004);
        mercury.mesh.rotateY(0.004);
        venus.mesh.rotateY(0.002);
        earth.mesh.rotateY(0.02);
        mars.mesh.rotateY(0.018);
        jupiter.mesh.rotateY(0.04);
        saturn.mesh.rotateY(0.038);
        uranus.mesh.rotateY(0.03);
        neptune.mesh.rotateY(0.032);
        pluto.mesh.rotateY(0.008);

        // Revolve around sun
        mercury.obj.rotateY(0.04);
        venus.obj.rotateY(0.015);
        earth.obj.rotateY(0.02);
        mars.obj.rotateY(0.008);
        jupiter.obj.rotateY(0.002);
        saturn.obj.rotateY(0.0009);
        uranus.obj.rotateY(0.0004);
        neptune.obj.rotateY(0.0001);
        pluto.obj.rotateY(0.00007)

        renderer.render(scene, camera);
    }
    animate();  
}