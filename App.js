import React, {useEffect, useRef, useState} from 'react'
import {Canvas, useFrame, useThree} from '@react-three/fiber/native'
import {Text, View} from "react-native";

function Box(props) {
  const mesh = useRef(null)
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  const [tumble, setTumble] = useState(0.02);

  useFrame((state, delta) => {
    mesh.current.rotation.x += tumble;
    mesh.current.rotation.y += tumble;
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

function Circle(props) {
  const mesh = useRef(null)
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  const [tumble, setTumble] = useState(0.0);
  const [deltaX, setDeltaX] = useState(0.1);
  const [deltaY, setDeltaY] = useState(0.15);

  const bounds = {left: -2, right: 2, top: -2, bottom: 2};

  //useFrame((state, delta) => {mesh.current.rotation.x += tumble; mesh.current.rotation.y += tumble; })
  useFrame((state, delta) => {
    if(mesh.current.position.x < bounds.left)  {
      setDeltaX(0.24);
    }
    if(mesh.current.position.x > bounds.right)  {
      setDeltaX(-0.23);
    }
    if(mesh.current.position.y < bounds.top)  {
      setDeltaY(0.22);
    }
    if(mesh.current.position.y > bounds.bottom)  {
      setDeltaY(-0.21);
    }
    mesh.current.position.x += deltaX;
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

function Torus(props) {
  const mesh = useRef(null)
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  const [tumble, setTumble] = useState(0.0);
  const [deltaX, setDeltaX] = useState(0.1);
  const [deltaY, setDeltaY] = useState(0.15);

  const bounds = {left: -2, right: 2, top: -2, bottom: 2};

  //useFrame((state, delta) => {mesh.current.rotation.x += tumble; mesh.current.rotation.y += tumble; })
  useFrame((state, delta) => {
    if(mesh.current.position.x < bounds.left)  {
      setDeltaX(0.04);
    }
    if(mesh.current.position.x > bounds.right)  {
      setDeltaX(-0.03);
    }
    if(mesh.current.position.y < bounds.top)  {
      setDeltaY(0.02);
    }
    if(mesh.current.position.y > bounds.bottom)  {
      setDeltaY(-0.01);
    }
    mesh.current.position.x += deltaX;
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
      <torusGeometry args={[2, 0.2, 8, 24]}/>
      <meshStandardMaterial color={hovered ? 'blue' : 'grey'}/>
    </mesh>
  )
}

function Camera(props) {
  const ref = useRef()
  const { setDefaultCamera } = useThree()
  // Make the camera known to the system
  useEffect(() => void setDefaultCamera(ref.current), [])
  // Update it every frame
  useFrame(() => ref.current.updateMatrixWorld())
  return <perspectiveCamera ref={ref} {...props} />
}

export default function App() {
  return (
      <Canvas >
        <Camera position={[0, 0, 10]} />
        <ambientLight/>
        {/*<pointLight position={[10, 10, 10]}/>*/}
        <directionalLight position={[10, 10, 10]}/>
        <Circle position={[0, 0, 0]}/>
        <Torus position={[0.5, 0.5, 0]}/>
        <Box position={[-1.2, 0, 0]}/>
        <Box position={[1.2, 0, 0]}/>
        <Box position={[1.2, 1, 0]}/>
        <Box position={[1.2, 1, 0]}/>
        <Box position={[1.2, 0, 1]}/>
        <Box position={[1.2, 0, 1]}/>
        <Box position={[1.2, 0, 2]}/>
        <Box position={[1.2, 0, 2]}/>
      </Canvas>
  );
}

