import React from 'react'

export const Tree = props => {
  return (
    <mesh {...props}>
      <boxBufferGeometry attach="geometry" args={[0.5, 1, 0.5]} />
      <meshLambertMaterial attach="material" color="green" />
    </mesh>
  )
}
