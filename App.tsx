import React, {MutableRefObject, useEffect, useRef, useState} from 'react'
import {Canvas, MeshProps, useFrame, useThree} from '@react-three/fiber/native'
import {Text, View} from "react-native";

function Box(props: MeshProps) {
  const mesh = useRef(null)
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  const [tumble, setTumble] = useState(0.02);

  useFrame((state, delta) => {
    if(mesh != null) {
      // @ts-ignore
      mesh.current.rotation.x += tumble;
      // @ts-ignore
      mesh.current.rotation.y += tumble;
    }
  })

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={(event) => {
        setActive(!active);
        setTumble(0.1);
      }}
      /*onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}*/>
      <boxGeometry args={[1, 1, 1]}/>
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'}/>
    </mesh>
  )
}

function Circle(props: MeshProps) {
  const mesh = useRef(null)
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  const [tumble, setTumble] = useState(0.0);
  const [deltaX, setDeltaX] = useState(0.1);
  const [deltaY, setDeltaY] = useState(0.15);

  const bounds = {left: -4, right: 4, top: -2, bottom: 2};

  //useFrame((state, delta) => {mesh.current.rotation.x += tumble; mesh.current.rotation.y += tumble; })
  useFrame((state, delta) => {
// @ts-ignore
    if (mesh.current.position.x < bounds.left) {
      setDeltaX(0.24);
    }
// @ts-ignore
    if (mesh.current.position.x > bounds.right) {
      setDeltaX(-0.23);
    }
// @ts-ignore
    if (mesh.current.position.y < bounds.top) {
      setDeltaY(0.22);
    }
// @ts-ignore
    if (mesh.current.position.y > bounds.bottom) {
      setDeltaY(-0.21);
    }
// @ts-ignore
    mesh.current.position.x += deltaX;
// @ts-ignore
    mesh.current.position.y += deltaY;
  });

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={(event) => {
        setActive(!active);
        setTumble(0.0);
      }}
      /*      onPointerOver={(event) => setHover(true)}
            onPointerOut={(event) => setHover(false)}*/>
      <circleGeometry args={[2, 32]}/>
      <meshBasicMaterial color={hovered ? 'purple' : 'green'}/>
      {/*<meshStandardMaterial color={hovered ? 'purple' : 'green'}/>*/}
    </mesh>
  )
}

function Torus(props: MeshProps) {
  const mesh = useRef(null)
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  const [tumble, setTumble] = useState(0.0);
  const [deltaX, setDeltaX] = useState(1);
  const [deltaY, setDeltaY] = useState(1);

  const bounds = {left: -5, right: 5, top: -2, bottom: 2};

  //useFrame((state, delta) => {mesh.current.rotation.x += tumble; mesh.current.rotation.y += tumble; })
  useFrame((state, delta) => {
    //console.log(state, delta);
// @ts-ignore
    if(mesh.current.position.x < bounds.left)  {
      setDeltaX(1);
    }
// @ts-ignore
    if(mesh.current.position.x > bounds.right)  {
      setDeltaX(-1);
    }
// @ts-ignore
    if(mesh.current.position.y < bounds.top)  {
      setDeltaY(1);
    }
// @ts-ignore
    if(mesh.current.position.y > bounds.bottom)  {
      setDeltaY(-1);
    }
// @ts-ignore
    mesh.current.position.x += deltaX * delta * 1;
// @ts-ignore
    mesh.current.position.y += deltaY * delta * 1;
  });

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={(event) => {
        setActive(!active);
        setTumble(0.0);
      }}
            onPointerOver={(event) => setHover(true)}
            onPointerOut={(event) => setHover(false)}>
      <torusGeometry args={[2, .2, 16, 48]}/>
      <meshStandardMaterial color={hovered ? 'blue' : 'teal'}/>
    </mesh>
  )
}

export default function App() {
  return (
      <Canvas orthographic camera={{ zoom: 100, position: [0, 0, 100] }}>
        <ambientLight/>
        {/*<pointLight position={[10, 10, 10]}/>*/}
        <directionalLight position={[10, 10, 10]}/>
        <Circle position={[0, 0, 0]}/>
        <Torus position={[0.5, 0.5, 0]}/>
        <Box position={[-1.2, 0, 0]}/>
        <Box position={[1.2, 0, 0]}/>
        <Box position={[1.2, 1, 0]}/>
        <Box position={[-1.4, 1, 0]}/>
        <Box position={[-0.8, 0, 1]}/>
        <Box position={[1.8, 0, 1]}/>
        <Box position={[1.7, 0, 2]}/>
        <Box position={[1.6, 0, 2]}/>
      </Canvas>
  );
}

