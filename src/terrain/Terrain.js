import React from 'react'
import * as THREE from 'three'
import { useControl } from 'react-three-gui'

import { math } from '../functions/Math'

function _ModifyVertices(geometry, size, a, b) {
  geometry.vertices.forEach(v => {
    let center = new THREE.Vector2(0, 0)
    let vertex = new THREE.Vector2(v.x, v.y)

    // let dist = vertex.distanceTo(center)
    // let h = 1 - math.sat(dist / size)
    // h = h * h + h * (h * (h * a + b) + c)

    v.z = a * Math.sin(b * v.x) + a * Math.cos(b * v.y)
  })
}

const Plane = props => {
  const S = useControl('Size', { type: 'number', value: 15, min: 10, max: 30 })
  const V = useControl('Vertices', {
    type: 'number',
    value: 50,
    min: 10,
    max: 100,
  })

  const a = useControl('A', { type: 'number', value: .4, min: -Math.PI, max: Math.PI })
  const b = useControl('B', { type: 'number', value: 2.2, min: -Math.PI, max: Math.PI })

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
