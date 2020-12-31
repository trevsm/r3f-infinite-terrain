import React, { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame, useLoader } from 'react-three-fiber'
import grass from './grass.png'

export function Grass({ geometry }) {
  const initialPositions = []
  geometry.vertices.forEach(v => {
    if (v.z < -0.5 && Math.random() * 5 < 3) {
      initialPositions.push(v.x + Math.random() / 3)
      initialPositions.push(v.y + Math.random() / 3)
      initialPositions.push(v.z + Math.random() / 3)
    }
  })

  const positions = useMemo(() => new Float32Array(initialPositions), [
    initialPositions,
  ])

  const geom = useRef()

  const texture = useLoader(THREE.TextureLoader, grass)

  return (
    <>
      <points ref={geom}>
        <bufferGeometry attach="geometry">
          <bufferAttribute
            attachObject={['attributes', 'position']}
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          map={texture}
          size={2}
          transparent
          opacity={1}
          sizeAttenuation
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </points>
    </>
  )
}
