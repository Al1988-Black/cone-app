import Triangle from "./Triangle";

const Cone = ({ verticeArray, position }) => {
  return verticeArray.map((verticesPositions, index) => (
    <Triangle
      position={position}
      verticesProps={verticesPositions}
      key={index}
    />
  ));
};

export default Cone;
