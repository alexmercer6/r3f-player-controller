import { Box } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import React, { useEffect, useRef } from 'react';
import { BoxGeometry, Mesh } from 'three';

export const Ground = () => {
  const ground = useRef<Mesh>(null);

  return (
    <RigidBody
      type="fixed"
      restitution={1}
      friction={2}
    >
      <mesh
        ref={ground}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -1, 0]}
      >
        <boxGeometry args={[100, 100, 1]} />
        <meshNormalMaterial />
      </mesh>
    </RigidBody>
  );
};
