import { Canvas } from '@react-three/fiber';
import Experience from './components/Experience';
import { Physics } from '@react-three/rapier';

function App() {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 5, 15], fov: 30 }}
    >
      <color
        attach="background"
        args={['#ececec']}
      />
      <Physics>
        <Experience />
      </Physics>
    </Canvas>
  );
}

export default App;
