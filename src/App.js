import React from 'react'
import { Canvas } from 'react-three-fiber'
import { Controls } from 'react-three-gui'
import { OrbitControls, softShadows } from '@react-three/drei'

import { Lighting } from './lighting/Lighting'
import { Terrain } from './terrain/Terrain'

import './App.css'

softShadows()

export default function App() {
  return (
    <Controls.Provider>
      <Controls.Canvas
        shadowMap
        gl={{ alpha: false }}
        camera={{ position: [30, 20, 30], fov: 60 }}
      >
        <OrbitControls />
        <Lighting />
        <Terrain />
      </Controls.Canvas>
      <Controls />
    </Controls.Provider>
  )
}
