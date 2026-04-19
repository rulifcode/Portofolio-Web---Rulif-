/* eslint-disable react/no-unknown-property */
'use client';

import { useEffect, useRef, useState } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { useGLTF, useTexture, Environment, Lightformer } from '@react-three/drei';
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
} from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import * as THREE from 'three';

import cardGLB from './card.glb';
import profileImg from './profile1.png';
import './Lanyard.css';

extend({ MeshLineGeometry, MeshLineMaterial });

/* ================= MAIN ================= */

export default function Lanyard({
  position = [0, 0, 30],
  gravity = [0, -40, 0],
  fov = 20,
  transparent = true,
  dark = true, // ← default dark sekarang true
}) {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.innerWidth < 768
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="lanyard-wrapper">
      <Canvas
        camera={{ position, fov }}
        dpr={[1, isMobile ? 1.5 : 2]}
        gl={{ alpha: transparent }}
        onCreated={({ gl }) =>
          gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)
        }
      >
        <ambientLight intensity={Math.PI} />

        <Physics gravity={gravity} timeStep={isMobile ? 1 / 30 : 1 / 60}>
          <Band isMobile={isMobile} isDark={dark} />
        </Physics>

        <Environment blur={0.75}>
          <Lightformer intensity={2} color="white" position={[0, -1, 5]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={3} color="white" position={[-1, -1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={3} color="white" position={[1, 1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={10} color="white" position={[-10, 0, 14]} rotation={[0, Math.PI / 2, Math.PI / 3]} scale={[100, 10, 1]} />
        </Environment>
      </Canvas>
    </div>
  );
}

/* ================= ROUNDED RECT SHAPE ================= */

function makeRoundedRect(w, h, r) {
  const hw = w / 2;
  const hh = h / 2;
  const shape = new THREE.Shape();
  shape.moveTo(-hw + r, -hh);
  shape.lineTo( hw - r, -hh);
  shape.quadraticCurveTo( hw, -hh,  hw, -hh + r);
  shape.lineTo( hw,  hh - r);
  shape.quadraticCurveTo( hw,  hh,  hw - r,  hh);
  shape.lineTo(-hw + r,  hh);
  shape.quadraticCurveTo(-hw,  hh, -hw,  hh - r);
  shape.lineTo(-hw, -hh + r);
  shape.quadraticCurveTo(-hw, -hh, -hw + r, -hh);
  shape.closePath();
  return shape;
}

/* ================= BLACK PLANE (auto-fit dari bounding box card) ================= */

function BlackPlane({ geometry }) {
  const [planeProps, setPlaneProps] = useState(null);

  useEffect(() => {
    if (!geometry) return;

    geometry.computeBoundingBox();
    const box = geometry.boundingBox;

    const width   = box.max.x - box.min.x;
    const height  = box.max.y - box.min.y;
    const centerX = (box.max.x + box.min.x) / 2;
    const centerY = (box.max.y + box.min.y) / 2;

    setPlaneProps({ width, height, centerX, centerY });
  }, [geometry]);

  if (!planeProps) return null;

  const { width, height, centerX, centerY } = planeProps;

  const pad        = 0.02;
  const borderPad  = 0.018;
  const radius     = 0.06;   // border-radius — ubah nilai ini untuk lebih/kurang rounded

  const w = width  + pad;
  const h = height + pad;

  const innerShape = makeRoundedRect(w, h, radius);
  const outerShape = makeRoundedRect(w + borderPad, h + borderPad, radius + 0.005);

  return (
    <group position={[centerX, centerY, 0]}>
      {/* Border tipis abu/putih — rounded */}
      <mesh position={[0, 0, -0.012]}>
        <shapeGeometry args={[outerShape, 64]} />
        <meshBasicMaterial color="#cccccc" opacity={0.55} transparent />
      </mesh>

      {/* Background hitam glossy — rounded */}
      <mesh position={[0, 0, -0.008]}>
        <shapeGeometry args={[innerShape, 64]} />
        <meshPhysicalMaterial
          color="#0a0a0a"
          roughness={0.15}
          metalness={0.6}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>
    </group>
  );
}

/* ================= BAND ================= */

function Band({ maxSpeed = 50, minSpeed = 0, isMobile, isDark }) {
  const band = useRef();
  const fixed = useRef();
  const j1 = useRef();
  const j2 = useRef();
  const j3 = useRef();
  const card = useRef();

  const vec = new THREE.Vector3();
  const ang = new THREE.Vector3();
  const rot = new THREE.Vector3();
  const dir = new THREE.Vector3();

  const { nodes, materials } = useGLTF(cardGLB);
  const profileTexture = useTexture(profileImg);

  const segmentProps = {
    type: 'dynamic',
    canSleep: true,
    colliders: false,
    angularDamping: 4,
    linearDamping: 4,
  };

  /* ================= STYLE ================= */

  // Tali putih di dark mode, hitam di light mode
  const lanyardColor = isDark ? '#ffffff' : '#111111';
  const lanyardWidth = isDark ? 1 : 0.6;

  /* ================= CURVE INIT ================= */

  const [curve] = useState(() => {
    const c = new THREE.CatmullRomCurve3([
      new THREE.Vector3(1.5, 0, 0),
      new THREE.Vector3(1.0, 0, 0),
      new THREE.Vector3(0.5, 0, 0),
      new THREE.Vector3(0.0, 0, 0),
    ]);
    c.curveType = 'chordal';
    return c;
  });

  /* ================= STATE ================= */

  const [dragged, setDragged] = useState(false);
  const [hovered, setHovered] = useState(false);

  const frameCount = useRef(0);
  const [ready, setReady] = useState(false);

  /* ================= JOINTS ================= */

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.5, 0]]);

  /* ================= CURSOR ================= */

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab';
      return () => (document.body.style.cursor = 'auto');
    }
  }, [hovered, dragged]);

  /* ================= FRAME LOOP ================= */

  useFrame((state, delta) => {
    if (frameCount.current < 10) {
      frameCount.current++;
      if (frameCount.current === 10) setReady(true);
      return;
    }

    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));

      [card, j1, j2, j3, fixed].forEach(ref => ref.current?.wakeUp());

      card.current?.setNextKinematicTranslation({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z,
      });
    }

    if (!fixed.current) return;

    const safeDelta = Math.min(delta, 0.05);

    [j1, j2, j3].forEach(ref => {
      if (!ref.current.lerped) {
        ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
      }

      const dist = ref.current.lerped.distanceTo(ref.current.translation());
      const speed = safeDelta * (minSpeed + Math.min(1, Math.max(0.1, dist)) * (maxSpeed - minSpeed));

      ref.current.lerped.lerp(ref.current.translation(), speed);
    });

    curve.points[0].copy(j3.current.lerped);
    curve.points[1].copy(j2.current.lerped);
    curve.points[2].copy(j1.current.lerped);
    curve.points[3].copy(fixed.current.translation());

    band.current.geometry.setPoints(curve.getPoints(isMobile ? 32 : 64));

    ang.copy(card.current.angvel());
    rot.copy(card.current.rotation());

    card.current.setAngvel({
      x: ang.x,
      y: ang.y - rot.y * 0.25,
      z: ang.z,
    });
  });

  /* ================= TEXTURE ================= */

  profileTexture.wrapS = profileTexture.wrapT = THREE.ClampToEdgeWrapping;
  profileTexture.flipY = false;

  /* ================= RENDER ================= */

  return (
    <>
      <group position={[0, isMobile ? 4.0 : 4.5, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />

        {[j1, j2, j3].map((ref, i) => (
          <RigidBody
            key={i}
            ref={ref}
            position={[isMobile ? 0.3 * (i + 1) : 0.5 * (i + 1), 0, 0]}
            {...segmentProps}
          >
            <BallCollider args={[0.1]} />
          </RigidBody>
        ))}

        <RigidBody
          ref={card}
          position={[isMobile ? 1.2 : 2, 0, 0]}
          {...segmentProps}
          type={dragged ? 'kinematicPosition' : 'dynamic'}
        >
          <CuboidCollider args={[0.8, 1.125, 0.01]} />

          <group
            scale={2.25}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            onPointerUp={e => {
              e.target.releasePointerCapture(e.pointerId);
              setDragged(false);
            }}
            onPointerDown={e => {
              e.target.setPointerCapture(e.pointerId);
              setDragged(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation())));
            }}
          >
            {/* Background hitam — ukuran & posisi otomatis dari boundingBox geometry card */}
            <BlackPlane geometry={nodes.card.geometry} />

            {/* Card utama dengan foto profile */}
            <mesh geometry={nodes.card.geometry}>
              <meshPhysicalMaterial
                map={profileTexture}
                map-anisotropy={16}
                map-repeat={[0.9, 0.7]}
                map-offset={[0.2, 0.2]}
                map-center={[0.7, 0.5]}
                clearcoat={isMobile ? 0 : 1}
                clearcoatRoughness={0.15}
                roughness={0.3}
                metalness={0.1}
              />
            </mesh>

            <mesh geometry={nodes.clip.geometry} material={materials.metal} />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
          </group>
        </RigidBody>
      </group>

      {/* Tali / lanyard — hitam pekat */}
      <mesh ref={band} visible={ready}>
        <meshLineGeometry />
        <meshLineMaterial
          color={lanyardColor}
          lineWidth={isMobile ? 0.5 : lanyardWidth}
          depthTest={false}
          resolution={isMobile ? [1000, 2000] : [1000, 1000]}
          opacity={1}
          transparent
        />
      </mesh>
    </>
  );
}