import { useKeyboardControls } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import {
  CapsuleCollider,
  CollisionEnterHandler,
  CollisionEnterPayload,
  RapierRigidBody,
  RigidBody,
} from '@react-three/rapier';
import { useEffect, useRef, useState } from 'react';

import { Group, Scene, Vector3 } from 'three';
import { OrbitControls as OrbitControlsType } from 'three-stdlib';
import { ActionName, Model } from './Model';

export const Controls = {
  forward: 'forward',
  back: 'back',
  left: 'left',
  right: 'right',
  jump: 'jump',
  leftPunch: 'left punch',
  rightPunch: 'right punch',
};

export const CharacterController = () => {
  const JUMP_FORCE = 1;
  const MOVEMENT_SPEED = 0.3;
  const MAX_VEL = 3;
  const RUN_VEL = 1;
  const jumpPressed = useKeyboardControls((state) => state[Controls.jump]);
  const leftPressed = useKeyboardControls((state) => state[Controls.left]);
  const rightPressed = useKeyboardControls((state) => state[Controls.right]);
  const backPressed = useKeyboardControls((state) => state[Controls.back]);
  const forwardPressed = useKeyboardControls(
    (state) => state[Controls.forward]
  );
  const [currentAnimation, setCurrentAnimation] = useState<ActionName>(
    'CharacterArmature|Idle'
  );
  const rigidbody = useRef<RapierRigidBody>(null);
  const isOnFloor = useRef(true);
  const charPosition = useRef<Vector3>(new Vector3());

  const vec = new Vector3();
  const target = new Vector3(0, 0, 0);

  const { scene } = useThree();

  useFrame(({ camera, controls }) => {
    if (rigidbody.current && character.current) {
      const impulse = { x: 0, y: 0, z: 0 };
      if (jumpPressed && isOnFloor.current) {
        impulse.y += JUMP_FORCE;
        isOnFloor.current = false;
      }

      const linvel = rigidbody.current.linvel();
      let changeRotation = false;
      if (rightPressed && linvel.x < MAX_VEL) {
        impulse.x += MOVEMENT_SPEED;
        changeRotation = true;
      }
      if (leftPressed && linvel.x > -MAX_VEL) {
        impulse.x -= MOVEMENT_SPEED;
        changeRotation = true;
      }
      if (backPressed && linvel.z < MAX_VEL) {
        impulse.z += MOVEMENT_SPEED;
        changeRotation = true;
      }
      if (forwardPressed && linvel.z > -MAX_VEL) {
        impulse.z -= MOVEMENT_SPEED;
        changeRotation = true;
      }

      rigidbody.current.applyImpulse(impulse, true);
      if (changeRotation) {
        const angle = Math.atan2(linvel.x, linvel.z);
        character.current.rotation.y = angle;
      }

      if (Math.abs(linvel.x) > RUN_VEL || Math.abs(linvel.z) > RUN_VEL) {
        setCurrentAnimation('CharacterArmature|Run');
      } else {
        setCurrentAnimation('CharacterArmature|Idle');
      }

      character.current.getWorldPosition(target);
      camera.position.set(target.x, target.y + 5, target.z + 15);
      camera.lookAt(target);
    }
  });

  const character = useRef<Group>(null);

  return (
    <group>
      <RigidBody
        ref={rigidbody}
        colliders={false}
        scale={[0.5, 0.5, 0.5]}
        enabledRotations={[false, false, false]}
        onCollisionEnter={(e: CollisionEnterPayload) => {
          if (
            e.rigidBodyObject &&
            e.rigidBodyObject.children[0].userData.ground
          ) {
            isOnFloor.current = true;
          }
          if (
            e.rigidBodyObject &&
            !e.rigidBodyObject.children[0].userData.ground
          ) {
            const vec = new Vector3();
            character.current?.getWorldDirection(vec);
            e.rigidBody?.applyImpulse(
              { x: vec.x * 10, y: vec.y * 10, z: vec.z * 10 },
              true
            );
            // e.rigidBody?.setEnabled(false);
            e.rigidBodyObject.children[0].visible = false;
          }
        }}
      >
        <CapsuleCollider
          args={[1, 0.4]}
          position={[0, 1.2, 0]}
        />
        <group ref={character}>
          <Model currentAnimation={currentAnimation} />
        </group>
      </RigidBody>
    </group>
  );
};
