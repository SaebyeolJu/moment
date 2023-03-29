import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { TextureLoader, MeshStandardMaterial, Mesh } from "three";
import { Cylinder, Circle } from "@react-three/drei";

interface MedalProps {
  imageUrl: string;
}

const Medal: React.FC<MedalProps> = ({ imageUrl }) => {
  const coinRef = useRef<Mesh>(null); // 메달의 회전을 조작하기 위한 참조 생성

  // 이미지 URL에 대한 텍스쳐를 생성하고 캐싱
  const texture = useMemo(() => new TextureLoader().load(imageUrl), [imageUrl]);

  // 텍스쳐를 사용하는 메시 표준 재질 생성
  const material = new MeshStandardMaterial({ map: texture });

  // 매 프레임마다 메달의 회전을 갱신
  useFrame(() => {
    if (coinRef.current) {
      coinRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={coinRef} material={material}>
      {/* 원형 면을 생성하고, 메달 앞면에 위치시킴 */}
      <Circle
        args={[1, 50]}
        material={material}
        scale={[1, 1, 1]}
        position={[0, 0, 0.051]}
      />
      {/* 원통형을 생성하고, 메달의 두께와 모양에 맞게 회전 및 크기 조정 */}
      <Cylinder
        args={[1, 1, 0.1, 50]}
        rotation={[Math.PI / 2, 4.7, 0]}
        material={material}
        scale={[1, 1, 1]}
      />
    </mesh>
  );
};

export default Medal;
