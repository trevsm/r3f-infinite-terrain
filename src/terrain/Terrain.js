import React, { useEffect, useRef } from 'react'

import * as THREE from 'three'
import { useLoader } from 'react-three-fiber'
import { useControl } from 'react-three-gui'
import { useConvexPolyhedron } from 'use-cannon'

import rocks from './rock.jpg'
import rocksDisp from './DisplacementMap.png'
import { perlin } from '../functions/Math'
import { Water } from './Water'

function modifiedVertices(geometry, amp, length, canyons, xShift, yShift) {
  return geometry.vertices.map(v => {
    let height = amp * perlin.get(length * v.x + xShift, length * v.y + yShift)

    if (canyons) {
      height += Math.floor(height)
    }
    return new THREE.Vector3(v.x, v.y, height)
  })
}

const Plane = props => {
  const canyons = useControl('Canyons', {
    type: 'boolean',
    value: false,
  })
  const wireframe = useControl('Wireframe', {
    type: 'boolean',
    value: false,
  })
  const mapSize = useControl('Map Size', {
    type: 'number',
    value: 100,
    min: 10,
    max: 1000,
  })
  const vertices = useControl('Vertices', {
    type: 'number',
    value: 200,
    min: 10,
    max: 1000,
  })
  const amp = useControl('Amplitude', {
    type: 'number',
    value: 30,
    min: 0,
    max: 50,
  })
  const length = useControl('Length', {
    type: 'number',
    value: 0.03,
    min: 0,
    max: 0.1,
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

  const geometry = useRef(
    new THREE.PlaneGeometry(mapSize, mapSize, vertices, vertices)
  )

  const texture = useLoader(THREE.TextureLoader, rocks)
  const dM = useLoader(THREE.TextureLoader, rocksDisp)

  // texture.wrapS = texture.wrapT = THREE.RepeatWrapping
  // texture.repeat.set(10, 10)

  // dM.wrapS = texture.wrapT = THREE.RepeatWrapping
  // dM.repeat.set(10, 10)

  const material = useRef(
    new THREE.MeshPhongMaterial({
      color: 'grey',
      side: THREE.DoubleSide,
      map:texture,
      displacementMap: dM,
      wireframe: wireframe,
    })
  )

  // const [ref, api] = useConvexPolyhedron(() => ({
  //   mass: 0,
  //   type: 'Static',
  //   rotation: [Math.PI / 2, 0, Math.PI / 2],
  //   position: [0, 0, 0],
  //   args: geometry.current,
  // }))

  useEffect(() => {
    geometry.current = new THREE.PlaneGeometry(
      mapSize,
      mapSize,
      vertices,
      vertices
    )

    const mV = modifiedVertices(
      geometry.current,
      amp,
      length,
      canyons,
      xShift,
      yShift
    )
    //set visible plane
    geometry.current.vertices = mV
    //set CVPH hitbox
    // ref.current.geometry.vertices = mV
  }, [canyons, wireframe, mapSize, amp, vertices, length, xShift, yShift])
  //canyons, wireframe, mapSize, amp, vertices, length, xShift, yShift

  return (
    <>
      <mesh
        args={[geometry.current, material.current]}
        castShadow
        receiveShadow
        {...props}
      />
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
