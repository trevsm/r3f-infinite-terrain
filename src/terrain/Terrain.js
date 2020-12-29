import React from 'react'
import * as THREE from 'three'
import { useControl } from 'react-three-gui'

import { perlin } from '../functions/Math'
import { Water } from './Water'
import { useConvexPolyhedron } from 'use-cannon'
import { useFrame } from 'react-three-fiber'

function _ModifyVertices(geometry, amp, length, canyons, xShift, yShift) {
  geometry.vertices.map(v => {
    let height = amp * perlin.get(length * v.x + xShift, length * v.y + yShift)

    if (canyons) {
      height += Math.floor(height)
    }

    v.z = height
  })
}

const Plane = props => {
  const canyons = useControl('Canyons', {
    type: 'boolean',
    value: false,
  })
  const wireframe = useControl('Wireframe', {
    type: 'boolean',
    value: true,
  })
  const size = useControl('Map Size', {
    type: 'number',
    value: 60,
    min: 10,
    max: 60,
  })
  const verts = useControl('Vertices', {
    type: 'number',
    value: 30,
    min: 10,
    max: 100,
  })
  const amp = useControl('Amplitude', {
    type: 'number',
    value: 9.25,
    min: 0,
    max: 50,
  })
  const length = useControl('Length', {
    type: 'number',
    value: 0.03,
    min: 0,
    max: 0.5,
  })

  const xShift = useControl('X-Shift', {
    type: 'number',
    value: 0,
    min: -5,
    max: 5,
  })
  const yShift = useControl('Y-Shift', {
    type: 'number',
    value: 0,
    min: -5,
    max: 5,
  })

  const geometry = new THREE.PlaneGeometry(size, size, verts, verts)

  const material = new THREE.MeshBasicMaterial({
    color: 'grey',
    side: THREE.DoubleSide,
    wireframe: wireframe,
  })

  const [ref] = useConvexPolyhedron(() => ({
    mass: 0,
    type: 'Dynamic',
    rotation: [Math.PI / 2, 0, Math.PI / 2],
    position: [0, 0, 0],
    args: [geometry.vertices, geometry.faces],
  }))

  useFrame(() => {})

  _ModifyVertices(geometry, amp, length, canyons, xShift, yShift)

  return (
    <mesh
      ref={ref}
      args={[geometry, material]}
      {...props}
      castShadow
      receiveShadow
    />
  )
}

export const Terrain = () => {
  return (
    <>
      <Plane rotation={[Math.PI / 2, 0, Math.PI / 2]} />
      <Water />
    </>
  )
}
