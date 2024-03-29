/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from 'three';
import React, { useEffect, useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { GLTF } from 'three-stdlib';

type GLTFResult = GLTF & {
  nodes: {
    Pouch: THREE.Mesh;
    Face: THREE.Mesh;
    ShoulderPadL: THREE.Mesh;
    ShoulderPadR: THREE.Mesh;
    Wizard_Staff: THREE.Mesh;
    Wizard001: THREE.SkinnedMesh;
    Root: THREE.Bone;
  };
  materials: {
    Wizard_Texture: THREE.MeshStandardMaterial;
  };
};

export type ActionName =
  | 'CharacterArmature|Death'
  | 'CharacterArmature|Idle'
  | 'CharacterArmature|Idle_Attacking'
  | 'CharacterArmature|Idle_Weapon'
  | 'CharacterArmature|PickUp'
  | 'CharacterArmature|Punch'
  | 'CharacterArmature|RecieveHit'
  | 'CharacterArmature|RecieveHit_2'
  | 'CharacterArmature|Roll'
  | 'CharacterArmature|Run'
  | 'CharacterArmature|Run_Weapon'
  | 'CharacterArmature|Spell1'
  | 'CharacterArmature|Spell2'
  | 'CharacterArmature|Staff_Attack'
  | 'CharacterArmature|Walk';
type GLTFActions = Record<ActionName, THREE.AnimationAction>;

export function Model({
  currentAnimation,
}: // ...props
{
  currentAnimation: ActionName;
  // props: JSX.IntrinsicElements['group'];
}) {
  const group = useRef<THREE.Group>(null);
  const { nodes, materials, animations } = useGLTF(
    '/Animated Wizard.glb'
  ) as GLTFResult;
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    actions[currentAnimation]?.reset().fadeIn(0.03).play();

    return () => {
      actions[currentAnimation]?.reset().fadeOut(0.3);
    };
  }, [currentAnimation]);
  return (
    <group
      ref={group}
      // {...props}
      dispose={null}
    >
      <group name="Root_Scene">
        <group
          name="RootNode"
          userData={{ name: 'RootNode' }}
        >
          <group
            name="CharacterArmature"
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
            userData={{ name: 'CharacterArmature' }}
          >
            <primitive object={nodes.Root} />
          </group>
          <skinnedMesh
            name="Wizard001"
            geometry={nodes.Wizard001.geometry}
            material={materials.Wizard_Texture}
            skeleton={nodes.Wizard001.skeleton}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
            userData={{ name: 'Wizard.001' }}
          />
          <group
            name="Wizard"
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
            userData={{ name: 'Wizard' }}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload('/Animated Wizard.glb');
