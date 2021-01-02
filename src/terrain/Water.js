import React, { useMemo } from 'react'
import * as THREE from 'three'
import { usePlane } from 'use-cannon'

export function Water() {
  const mapWidth = 1000,
    mapLength = 1000
  const vX = 64

  const W = 0

  const [ref, api] = usePlane(() => ({
    position: [0, W, 0],
    rotation: [-Math.PI / 2, 0, 0],
    args: [mapWidth, mapLength, vX, vX],
  }))

  const light = useMemo(() => new THREE.SpotLight(0xffffff), [])

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
        color="blue"
        transparent
        opacity={0.2}
      />
    </mesh>
  )
}
