import React, { useEffect, useRef, useMemo } from 'react'

import * as THREE from 'three'
import { useLoader } from 'react-three-fiber'
import { useControl } from 'react-three-gui'
import { useConvexPolyhedron } from 'use-cannon'

import rocks from './textures/rock.jpg'
import rocksDisp from './textures/DisplacementMap.png'
import sand from './textures/sand.jpg'
import sandDisp from './textures/sandDisp.png'

import { Grass } from './Grass'
import { perlin } from '../functions/Math'
import { Water } from './Water'

function modifiedVertices(geometry, amp, length, xShift, yShift, zShift) {
  return geometry.vertices.map(v => {
    let height = amp * perlin.get(length * v.x + xShift, length * v.y + yShift)

    return new THREE.Vector3(v.x, v.y, -zShift + height)
  })
}

const Plane = props => {
  const wireframe = false,
    mapSize = 500,
    vertices = 100,
    amp = 30,
    length = 0.01,
    xShift = 0,
    yShift = 0,
    zShift = 0

  const geometry = useMemo(
    () => new THREE.PlaneGeometry(mapSize, mapSize, vertices, vertices),
    [mapSize, vertices]
  )

  const texture = useLoader(THREE.TextureLoader, sand)
  const dM = useLoader(THREE.TextureLoader, sandDisp)

  texture.wrapS = texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(40, 40)

  dM.wrapS = texture.wrapT = THREE.RepeatWrapping
  dM.repeat.set(40, 40)

  const material = useMemo(
    () =>
      new THREE.MeshPhongMaterial({
        color: 'grey',
        side: THREE.DoubleSide,
        map: texture,
        displacementMap: dM,
        wireframe: wireframe,
      }),
    [texture, dM, wireframe]
  )

  const grass = useMemo(() => <Grass geometry={geometry} />, [geometry])

  const [ref] = useConvexPolyhedron(() => ({
    mass: 0,
    type: 'Static',
    rotation: [Math.PI / 2, 0, Math.PI / 2],
    position: [0, 0, 0],
    args: geometry,
  }))

  useEffect(() => {
    const mV = modifiedVertices(geometry, amp, length, xShift, yShift, zShift)
    geometry.vertices = mV
  }, [])

  return (
    <>
      <group rotation={[Math.PI / 2, 0, Math.PI / 2]}>{grass}</group>
      <mesh args={[geometry, material]} castShadow receiveShadow {...props} />
    </>
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
