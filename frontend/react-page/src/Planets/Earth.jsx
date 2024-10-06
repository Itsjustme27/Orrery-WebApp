import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import getStarField from "../Star/getStarField";
import { useEffect } from "react";

// Threshold for closest NECs in AU (e.g., 0.1 AU)
const THRESHOLD = 0.1;

export default function Earth() {
  useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
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
    earthGroup.rotation.z = (-23.4 * Math.PI) / 180;
    scene.add(earthGroup);

    const detail = 12;
    const starField = getStarField();
    scene.add(starField); // Ensure star field is added only once

    const loader = new THREE.TextureLoader();
    const geometry = new THREE.IcosahedronGeometry(1, detail);
    const material = new THREE.MeshStandardMaterial({
      map: loader.load("./src/assets/earthmap1k.jpg"),
    });

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.03;

    const earthMesh = new THREE.Mesh(geometry, material);
    scene.add(earthMesh);

    const lightMat = new THREE.MeshBasicMaterial({
      map: loader.load("./src/assets/earthlights1k.jpg"),
      blending: THREE.AdditiveBlending,
    });
    const lightMesh = new THREE.Mesh(geometry, lightMat);
    scene.add(lightMesh);

    const sunLight = new THREE.DirectionalLight(0xffffff);
    sunLight.position.set(-2, -0.5, 1.5);
    scene.add(sunLight);

    // Creating NEOs mesh
    // function createNEOs(size, position, color) {
    //   const geo = new THREE.SphereGeometry(size, 16, 16);
    //   const mat = new THREE.MeshBasicMaterial({
    //     color: color,
    //   });
    //   const mesh = new THREE.Mesh(geo, mat);
    //   earthMesh.add(mesh);
    //   mesh.position.x = position;

    //   const obj = new THREE.Object3D();
    //   obj.add(mesh);
    //   scene.add(obj);
    //   return { mesh, obj };
    // }
    // Example usage for 433 Eros
    // const eros433 = createNEOs(0.5, 10, 0xf5733)

    function animate() {
      requestAnimationFrame(animate);
      earthMesh.rotation.y += 0.002;
      lightMesh.rotation.y += 0.002;

      // for NEO self rotation:
    //   eros433.mesh.rotateY(0.02);

      // for NEO revolve around earth
    //   eros433.obj.rotateY(0.01);
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
