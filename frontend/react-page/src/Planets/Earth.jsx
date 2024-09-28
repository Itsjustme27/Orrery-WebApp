import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import getStarField from '../Star/getStarField';
import { useEffect } from 'react';

// Threshold for closest NECs in AU (e.g., 0.1 AU)
const THRESHOLD = 0.1;

export default function Earth() {
    useEffect(() => {
        const width = window.innerWidth;
        const height = window.innerHeight;

        const renderer = new THREE.WebGLRenderer({
            antialias: true
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
        scene.add(starField); // Ensure star field is added only once

        const loader = new THREE.TextureLoader();
        const geometry = new THREE.IcosahedronGeometry(1, detail);
        const material = new THREE.MeshStandardMaterial({
            map: loader.load("./src/assets/earthmap1k.jpg")
        });

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.03;

        const earthMesh = new THREE.Mesh(geometry, material);
        scene.add(earthMesh);

        const lightMat = new THREE.MeshBasicMaterial({
            map: loader.load('./src/assets/earthlights1k.jpg'),
            blending: THREE.AdditiveBlending
        });
        const lightMesh = new THREE.Mesh(geometry, lightMat);
        scene.add(lightMesh);

        const sunLight = new THREE.DirectionalLight(0xffffff);
        sunLight.position.set(-2, -0.5, 1.5);
        scene.add(sunLight);

        // Fetch and render NECs asynchronously
        fetchNECs().then((data) => {
            const closeNECs = filterNECs(data);
            displayNECs(closeNECs, scene, camera);
        });

        function animate() {
            requestAnimationFrame(animate);
            earthMesh.rotation.y += 0.002;
            lightMesh.rotation.y += 0.002;
            renderer.render(scene, camera);
        }

        animate();

        // Cleanup on component unmount
        return () => {
            document.body.removeChild(renderer.domElement);
        };
    }, []); // Empty dependency array ensures this runs only once

    return null; // This component only interacts with Three.js, so no JSX is needed
}

// Fetch NEC data from NASA API
async function fetchNECs() {
    try {
        const res = await fetch('https://data.nasa.gov/resource/b67r-rgxc.json');
        const data = await res.json();
        console.log("Fetched Data:", data);
        return data;
    } catch (error) {
        console.error("Error fetching NEC data:", error);
        return [];
    }
}

// Filter NECs based on proximity to Earth (using moid_au)
function filterNECs(data) {
    return data.filter(NEC => {
        const moidAU = parseFloat(NEC.moid_au);
        return moidAU && moidAU <= THRESHOLD;
    });
}

// Display NECs as spheres in the scene
function displayNECs(NECs, scene, camera) {
    NECs.forEach(NEC => {
        const moidAU = parseFloat(NEC.moid_au);
        const distance = moidAU * 100; // Scale AU distance to scene units

        // Create a small sphere for each NEC
        const necGeometry = new THREE.SphereGeometry(0.3, 16, 16);
        const necMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        const necMesh = new THREE.Mesh(necGeometry, necMaterial);

        // Position NEC at a distance proportional to moid_au
        necMesh.position.set(distance, 0, 0);
        scene.add(necMesh);

        // Optionally: Add a text label for each NEC
        const labelDiv = document.createElement('div');
        labelDiv.className = 'label';
        labelDiv.textContent = NEC.object_name;
        labelDiv.style.color = 'white';
        labelDiv.style.position = 'absolute';

        // Use a projection to position the label correctly
        const labelPosition = necMesh.position.clone();
        labelPosition.project(camera);

        const halfWidth = window.innerWidth / 2;
        const halfHeight = window.innerHeight / 2;

        labelDiv.style.left = `${halfWidth + labelPosition.x * halfWidth}px`;
        labelDiv.style.top = `${halfHeight - labelPosition.y * halfHeight}px`;

        document.body.appendChild(labelDiv);
    });
}
