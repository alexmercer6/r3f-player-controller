import { OrbitControls } from '@react-three/drei';
import { Ground } from './Ground';
import { RigidBody } from '@react-three/rapier';
import { ReactElement, useEffect, useState } from 'react';
import { Environment } from '@react-three/drei';
import { Model } from './Model';
import { CharacterController } from './CharacterController';

const Experience = () => {
  const [boxes, setBoxes] = useState<ReactElement[]>([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setBoxes((prev) => [
        ...prev,
        <RigidBody position={[0, 15, 0]}>
          <mesh>
            <boxGeometry />
            <meshNormalMaterial />
          </mesh>
        </RigidBody>,
      ]);
    }, 100);

    return () => clearInterval(intervalId); // Clean up the interval on unmount
  }, []);

  return (
    <>
      <Environment
        files="/clouds.hdr"
        background
        // blur={0.5}
      />

      <OrbitControls />
      <CharacterController />
      {boxes}
      <Ground />
    </>
  );
};

export default Experience;
