import * as THREE from 'three'
import React from 'react'

import { useFrame } from 'react-three-fiber'
import { useControl } from 'react-three-gui'
import { usePlane } from 'use-cannon'

export function Water() {
  const mapWidth = 10000,
    mapLength = 10000
  const vX = 32

  const W = useControl('Water Level', {
    type: 'number',
    value: -0.5,
    min: -5,
    max: 5,
  })

  const [ref, api] = usePlane(() => ({
    position: [0, W, 0],
    rotation: [-Math.PI / 2, 0, 0],
    args: [mapWidth, mapLength, vX, vX],
  }))

  useFrame(() => {
    ref.current.position.y = W
    // api.position.set([0, W, 0])
  })

  return (
    <mesh ref={ref} receiveShadow>
      <planeBufferGeometry
        attach="geometry"
        args={[mapWidth, mapLength, vX, vX]}
      />
      <meshStandardMaterial
        attach="material"
        color="#010178"
        side={THREE.DoubleSide}
        transparent
        opacity={0.5}
      />
    </mesh>
  )
}
