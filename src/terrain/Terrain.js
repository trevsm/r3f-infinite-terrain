import React, {useRef} from 'react'
import * as THREE from 'three'
import { useControl } from 'react-three-gui'

import { perlin } from '../functions/Math'

function _ModifyVertices(geometry, size, a, b, floor) {
  geometry.vertices.forEach(v => {
    let height = a * perlin.get(b * v.x, b * v.y)

    if (floor) {
      height = Math.floor(height)
      height += a * perlin.get(b * v.x, b * v.y)
    }

    // if (height < 0.25) {
    //   height = 1
    // } else if (height < 0.5) {
    //   height = 0.5
    // } else height = 0

    v.z = height
  })
}

const Plane = props => {

  const refresh = useControl('Refresh', {
    type: 'button',
    onClick: () => {
      // perlin.memory = {}
    }
  })


  const floor = useControl('Canyons', {
    type: 'boolean',
    value: true,
  })

  const wireframe = useControl('Wireframe', {
    type: 'boolean',
    value: true,
  })

  const S = useControl('Map Size', {
    type: 'number',
    value: 30,
    min: 10,
    max: 60,
  })

  const V = useControl('Vertices', {
    type: 'number',
    value: 77.5,
    min: 10,
    max: 100,
  })

  const a = useControl('Amplitude', {
    type: 'number',
    value: 3.85,
    min: 0,
    max: 10,
  })

  const b = useControl('Length', {
    type: 'number',
    value: 0.1,
    min: -1,
    max: 1,
  })

  const geometry = new THREE.PlaneGeometry(S, S, V, V)

  _ModifyVertices(geometry, S, a, b, floor)

  const material = new THREE.MeshBasicMaterial({
    color: 'grey',
    side: THREE.DoubleSide,
    wireframe: wireframe,
  })

  const ref = useRef()

  return <mesh ref={ref} args={[geometry, material]} {...props} castShadow receiveShadow/>
}

export const Terrain = () => {
  return (
    <>
      <Plane rotation={[Math.PI / 2, 0, Math.PI / 2]} />
    </>
  )
}
