import React from 'react'
import { Controls } from 'react-three-gui'
// import { OrbitControls, softShadows } from '@react-three/drei'

import { Lighting } from './lighting/Lighting'
import { Terrain } from './terrain/Terrain'
import Player from './player/Player'
import { Physics } from 'use-cannon'

import './App.css'

// <Canvas>
// shadowMap
// gl={{ alpha: false }}
// camera={{ position: [30, 20, 30], fov: 90 }}

export default function App() {
  return (
    <Controls.Provider>
      <Controls.Canvas shadowMap gl={{ antialias: false, alpha: false }}>
        <Lighting />
        <Physics>
          <Player />
          <Terrain />
        </Physics>
      </Controls.Canvas>
      <Controls />
    </Controls.Provider>
  )
}
