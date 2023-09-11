import { Canvas } from "@react-three/fiber";
import { OrbitControls, OrthographicCamera } from "@react-three/drei";
import Cone from "./geomentry/Cone";
import { useSelector } from "react-redux";
import { getCone, getConeLoadingStatus } from "../store/cone";

const CanvasCone = () => {
  const cone = useSelector(getCone());
  const isLoadingCone = useSelector(getConeLoadingStatus());
  if (isLoadingCone) {
    return "loading";
  }
  if (cone && cone.verticesCone) {
    return (
      <Canvas>
        <ambientLight intensity={0.25} color="red" />
        <pointLight intensity={0.75} position={[10, 500, 100]} />
        <orthographicCamera position={[1, 5, 2]} />
        <Cone position={[-0.5, 0.5, -8]} verticeArray={cone.verticesCone} />
        <OrbitControls />

        <OrthographicCamera
          makeDefault
          zoom={10}
          top={200}
          bottom={-200}
          left={200}
          right={-200}
          near={1}
          far={500}
          position={[5, 2, -20]}
        />
      </Canvas>
    );
  }
};

export default CanvasCone;
