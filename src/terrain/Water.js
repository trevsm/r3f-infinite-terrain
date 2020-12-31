import * as THREE from 'three'
import React from 'react'

import { MeshWobbleMaterial} from '@react-three/drei'

import { useFrame } from 'react-three-fiber'
import { useControl } from 'react-three-gui'
import { usePlane } from 'use-cannon'

export function Water() {
  const mapWidth = 1000,
    mapLength = 1000
  const vX = 64

  const W = useControl('Water Level', {
    type: 'number',
    value: 0,
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
        side={THREE.DoubleSide}
        metalness={2}
        color='blue'
        transparent
        opacity={.2}
      />
    </mesh>
  )
}
