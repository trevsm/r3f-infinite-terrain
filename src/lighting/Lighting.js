import React, { useRef } from 'react'
import * as THREE from 'three'
import { Sky } from '@react-three/drei'

export const Lighting = props => {
  return (
    <>
      {/* <fog attach="fog" args={['white', 0, 40]} /> */}
      <Sky
        distance={450000}
        sunPosition={[150, 150, 150]}
        inclination={0}
        azimuth={0.25}
      />
      <ambientLight />
      <directionalLight
        position={[150, 150, 150]}
        shadow-camera-left={-1000}
        shadow-camera-bottom={-1000}
        shadow-camera-right={1000}
        shadow-camera-top={1000}
        shadow-camera-near={0.1}
        shadow-camera-far={1500}
        castShadow
      />
    </>
  )
}
