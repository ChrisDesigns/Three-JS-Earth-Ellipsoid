import React, { Suspense } from "react";
import { Canvas } from "react-three-fiber";
import { Html, OrbitControls, useTextureLoader, Stars } from "drei";

const Fallback = () => (
  <Html>
    <p>Loading...</p>
  </Html>
);

const Earth = () => {
  const A = 6378.137; // equatorial radius
  const FE = 1 / 298.257223563; // flattening
  const B = A * (1 - FE); // polar radius
  const radius = (2 * A + B) / 3; // mean Earth radi

  const [earthTexture, normalTexture] = useTextureLoader([
    "earth_atmos_2048.jpg",
    "earth_normal_2048.jpg"
  ]);

  return (
    <mesh scale={[A / radius, B / radius, A / radius]}>
      <sphereGeometry attach="geometry" args={[2, 24, 32]} />
      <meshPhongMaterial
        attach="material"
        map={earthTexture}
        normalMap={normalTexture}
      />
    </mesh>
  );
};

export default function App() {
  return (
    <Canvas>
      <ambientLight />
      <Suspense fallback={<Fallback />}>
        <Earth />
      </Suspense>
      <Stars />
      <OrbitControls maxDistance={6} minDistance={3} enablePan={false} />
    </Canvas>
  );
}
