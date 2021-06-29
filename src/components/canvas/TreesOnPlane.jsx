import { useRef, useState } from 'react'
import * as THREE from 'three'
import {OrbitControls, useHelper} from '@react-three/drei'

const Sky = () => {
    return (
        <mesh>
            <sphereGeometry args={[800, 32, 32]} />
            <meshBasicMaterial color="blue" side={THREE.BackSide} />
        </mesh>
    )
}

const Tree = ({position}) => {
    const leavesScale = [2, Math.random() + 1 * 5, 2]
    const trunkScale = [0.5, 2, 0.5]

    const Leaves = () => {
        return (
            <mesh scale={leavesScale} position-y={4} receiveShadow castShadow>
                <coneGeometry args={[1,1,32]} />
                <meshStandardMaterial color={"green"} /> 
            </mesh>
        )
    }
    const Trunk = () => {
        return (
            <mesh scale={trunkScale} position-y={1} receiveShadow castShadow>
                <boxGeometry args={[1,1,1]} />
                <meshStandardMaterial color={"chocolate"} /> 
            </mesh>
        )
    }

    return (
        <group position={position}>
            <Leaves />
            <Trunk />
        </group>
    )
}
const ManyTrees = () => {
    const xArray = new Array(20).fill(0)
    const zArray = new Array(20).fill(0)

    return (
        <>
            {xArray.map(() => {
                return zArray.map(() => {
                    const randomX = (Math.random() - 0.5) * 200
                    const randomZ = (Math.random() - 0.5) * 200
                    const position = [randomX,0,randomZ]
                    return (
                        <Tree key={position} position={position} />
                    )
                })
            })}
        </>
    )
}


const Ground = () => {

    return (
        <mesh rotation-x={-Math.PI / 2.0} receiveShadow>
            <planeGeometry args={[200,200,10,10]}/>
            <meshStandardMaterial color="#434f43" />
        </mesh>
    )
}

const Lights = () => {
    const directionalLightRef = useRef()
    useHelper(directionalLightRef, THREE.DirectionalLightHelper,)

    return (
        <>
            <directionalLight
                ref={directionalLightRef}
                castShadow
                position={[20, 30, 10]}
                intensity={1}
                shadow-bias={-0.002}
                shadow-mapSize-width={2000}
                shadow-mapSize-height={2000}
            />
            <ambientLight />
        </>
    )
}

const TreesOnPlaneComponent = ({ route }) => { 

  return (
    <>
        <Ground />
        <Sky />
        <Tree position={[0,0,0]} />
        <Tree position={[3,0,1]} />
        <Tree position={[5,0,-2]} />
        <ManyTrees />
        <OrbitControls target={[0, 20, 0]} />
        <Lights />
    </>
  )
}
export default TreesOnPlaneComponent
