import React, { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame, useLoader, useThree } from 'react-three-fiber'
import grass from './textures/grass.png'
import { useEffect } from 'react/cjs/react.development'

export function Grass({ geometry }) {
  const initialPositions = []

  geometry.vertices.forEach(v => {
    if (v.z < -0.5) {
      initialPositions.push(v.x)
      initialPositions.push(v.y)
      initialPositions.push(v.z)
    }
  })

  const positions = useMemo(() => new Float32Array(initialPositions), [
    initialPositions,
  ])

  const geom = useRef()

  const texture = useLoader(THREE.TextureLoader, grass)

  const { Canvas } = useThree()

  useEffect(() => {
    console.log(Canvas)
  }, [])

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
