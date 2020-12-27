import React, { useRef } from 'react'
import { Sky } from '@react-three/drei'

export const Lighting = props => {
  return (
    <>
      {/* <fog attach="fog" args={['white', 0, 40]} /> */}
      <Sky
        distance={450000}
        sunPosition={[2.5, 8, 5]}
        inclination={0}
        azimuth={0.25}
      />
      <ambientLight intensity={0.4} />
      <directionalLight
        castShadow
        position={[2.5, 8, 5]}
        intensity={1.5}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
    </>
  )
}
