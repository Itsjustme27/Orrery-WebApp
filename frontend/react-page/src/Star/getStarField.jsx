import * as THREE from 'three';

// Function to create the star field
export default function getStarField() {
  const starGeometry = new THREE.BufferGeometry();
  const starMaterial = new THREE.PointsMaterial({
    color: 0xffffff,  // Color of the stars
    size: 0.3,        // Size of each star
    sizeAttenuation: true,
  });

  const starCount = 20000;  // Number of stars
  const starVertices = [];

  // Randomly position each star in 3D space
  for (let i = 0; i < starCount; i++) {
    const x = THREE.MathUtils.randFloatSpread(2000);  // Random position in X
    const y = THREE.MathUtils.randFloatSpread(2000);  // Random position in Y
    const z = THREE.MathUtils.randFloatSpread(2000);  // Random position in Z

    starVertices.push(x, y, z);
  }

  // Set the vertices (positions) of the stars
  starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));

  // Create the star field using Points
  const stars = new THREE.Points(starGeometry, starMaterial);

  return stars;  // This is an instance of THREE.Points, which is a subclass of THREE.Object3D
}