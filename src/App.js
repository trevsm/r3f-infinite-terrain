import React from 'react'
import { Canvas } from 'react-three-fiber'
// import { OrbitControls, softShadows } from '@react-three/drei'

import { Lighting } from './lighting/Lighting'
import { Terrain } from './terrain/Terrain'
import Player from './player/Player'
import { Physics } from 'use-cannon'

import './App.css'

export default function App() {
  return (
    <Canvas shadowMap gl={{ antialias: false, alpha: false }}>
      <Lighting />
      <Physics>
        <Player />
        <Terrain />
      </Physics>
    </Canvas>
  )
}
