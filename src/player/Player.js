import React from 'react'
import * as THREE from 'three'
import { useThree, useLoader } from 'react-three-fiber'
import { useSphere } from 'use-cannon'

import { PlayerMovement } from './PlayerMovement'
import { PlayerCamera } from './PlayerCamera'
import { usePlayerControls } from './PlayerControls'

import ball from './ball.jpg'

export default function Player(props) {
  const STATS = {
    speed: 5,
    player_height: 2.5,
    run_speed: () => STATS.speed * 2,
    pan_speed: () => STATS.speed * 0.6,
    jump_height: () => STATS.player_height * 3,
    inertia: 5,
  }

  // Player hitbox
  const [ref, api] = useSphere(() => ({
    mass: 1,
    type: 'Dynamic',
    position: [0, STATS.player_height, 0],
    size: [1, 32, 32],
    ...props,
  }))

  const { camera } = useThree()
  const { forward, backward, left, right, jump, run } = usePlayerControls()

  const texture = useLoader(THREE.TextureLoader, ball)

  return (
    <group>
      <PlayerCamera ref={ref} STATS={STATS} camera={camera} />
      <PlayerMovement
        ref={ref}
        api={api}
        STATS={STATS}
        camera={camera}
        C={{ forward, backward, left, right, jump, run }}
      />
      <mesh ref={ref} castShadow receiveShadow>
        <sphereBufferGeometry attach="geometry" args={[1, 32, 32]} />
        <meshStandardMaterial attach="material" map={texture} />
      </mesh>
    </group>
  )
}
