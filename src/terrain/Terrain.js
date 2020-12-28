import React from 'react'
import * as THREE from 'three'
import { useControl } from 'react-three-gui'

import { perlin } from '../functions/Math'

function _ModifyVertices(geometry, size, a, b) {
  geometry.vertices.forEach(v => {
    let height = a * perlin.get(b * v.x, b * v.y)
    height = height < 0.5 ? 1 : 0
    height = height < 0.5 ? 1 : 0
    v.z = height
  })
}

const Plane = props => {
  const S = useControl('Size', { type: 'number', value: 15, min: 10, max: 30 })
  const V = useControl('Vertices', {
    type: 'number',
    value: 70,
    min: 10,
    max: 100,
  })

  const a = useControl('Amplitude', {
    type: 'number',
    value: 1.5,
    min: -Math.PI,
    max: Math.PI,
  })

  const b = useControl('Length', {
    type: 'number',
    value: 0.5,
    min: -Math.PI,
    max: Math.PI,
  })

  const geometry = new THREE.PlaneGeometry(S, S, V, V)

  _ModifyVertices(geometry, S, a, b)

  const material = new THREE.MeshBasicMaterial({
    color: 'grey',
    side: THREE.DoubleSide,
    wireframe: true,
  })

  return <mesh args={[geometry, material]} {...props} />
}

export const Terrain = () => {
  return (
    <>
      <Plane rotation={[Math.PI / 2, 0, Math.PI / 2]} />
    </>
  )
}
