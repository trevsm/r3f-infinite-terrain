import React from 'react'
import * as THREE from 'three'

function _ModifyVertices(geometry) {
  const amplitude = 1
  geometry.vertices.forEach(v => {
    v.z = Math.random() * amplitude
  })
}

const Plane = props => {
  const geometry = new THREE.PlaneGeometry(10, 10, 20, 20)

  _ModifyVertices(geometry)

  const material = new THREE.MeshBasicMaterial({
    color: 'grey',
    side: THREE.DoubleSide,
    wireframe:true
  })

  return <mesh args={[geometry, material]} {...props}/>
}

export const Terrain = () => {
  return (
    <>
      <Plane rotation={[Math.PI / 2, 0, Math.PI / 2]} />
    </>
  )
}
