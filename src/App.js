import React from 'react'

import { Canvas } from 'react-three-fiber'
import { OrbitControls, softShadows } from '@react-three/drei'

import { Lighting } from './lighting/Lighting'
import { Terrain } from './terrain/Terrain'

import './App.css'

softShadows()

export default function App() {
  return (
    <Canvas
      shadowMap
      gl={{ alpha: false }}
      camera={{ position: [-10, 3, 10], fov: 60 }}
    >
      <OrbitControls />
      <Lighting />
      <Terrain />
    </Canvas>
  )
}
