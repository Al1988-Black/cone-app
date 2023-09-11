import * as THREE from "three";

const Triangle = ({ verticesProps, position }) => {
  const vertices = new Float32Array(verticesProps);
  const TriangleGeometry = new THREE.BufferGeometry();
  TriangleGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(vertices, 3)
  );

  return <mesh position={position} geometry={TriangleGeometry} />;
};

export default Triangle;
