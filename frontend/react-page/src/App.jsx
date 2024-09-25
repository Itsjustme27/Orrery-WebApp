
import { useState, useEffect } from 'react';
import Earth from './Planets/Earth';
import Sun from './Planets/Sun';
import Mercury from './Planets/Mercury';

// import * as THREE from 'three';
// import getStarField from './Star/getStarField';

export default function App() {
    // const width = window.innerWidth;
    // const height = window.innerHeight;

    // const renderer = new THREE.WebGLRenderer({
    //     antialias : true
    // });

    // renderer.setSize(width, height);
    // document.body.appendChild(renderer.domElement);



    // const fov = 75;
    // const aspect = width / height;
    // const near = 0.1;
    // const far = 1000;

    // const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    // camera.position.z = 5;
    
    // const scene = new THREE.Scene();
    // const starField = getStarField();       
    // scene.add(getStarField());

    // renderer.render(scene, camera);

    return (
        <>
            <Mercury />
        </>
    );
}