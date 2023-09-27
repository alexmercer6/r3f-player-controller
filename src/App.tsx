import { Canvas } from '@react-three/fiber';
import Experience from './components/Experience';
import { Physics } from '@react-three/rapier';
import { KeyboardControls, KeyboardControlsEntry } from '@react-three/drei';
import { Suspense, useMemo } from 'react';

enum Controls {
  forward = 'forward',
  back = 'back',
  left = 'left',
  right = 'right',
  jump = 'jump',
  leftPunch = 'left punch',
  rightPunch = 'right punch',
}

function App() {
  const map = useMemo<KeyboardControlsEntry<Controls>[]>(
    () => [
      { name: Controls.forward, keys: ['ArrowUp', 'KeyW'] },
      { name: Controls.back, keys: ['ArrowDown', 'KeyS'] },
      { name: Controls.left, keys: ['ArrowLeft', 'KeyQ'] },
      { name: Controls.right, keys: ['ArrowRight', 'KeyE'] },
      { name: Controls.jump, keys: ['Space'] },
      { name: Controls.leftPunch, keys: ['KeyR'] },
      { name: Controls.rightPunch, keys: ['KeyF'] },
    ],
    []
  );
  return (
    <KeyboardControls map={map}>
      <Suspense>
        <Canvas
          shadows
          camera={{ position: [0, 5, 200], fov: 30 }}
        >
          <color
            attach="background"
            args={['#ececec']}
          />
          <Physics debug>
            <Experience />
          </Physics>
        </Canvas>
      </Suspense>
    </KeyboardControls>
  );
}

export default App;
