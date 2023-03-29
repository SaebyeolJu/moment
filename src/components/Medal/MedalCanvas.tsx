import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";

import useRemoveTransparent from "../../utils/UseRemoveTransparent";

import Medal from "./Medal";

// 렌더링 할 메달 이미지의 URL을 입력으로 받는다.
type MedalCanvasProps = {
  imageUrl: string;
};

/**
 * @description Medal 컴포넌트를 렌더링하는 Canvas 컴포넌트
 * @param param - 렌더링 할 메달 이미지의 URL
 * @returns - 조명 설정, 카메라 설정, MedalCanvas 컴포넌트가 랜더링 된 Canvas 컴포넌트
 */
const MedalCanvas: React.FC<MedalCanvasProps> = ({ imageUrl }) => {
  // 이미지에서 투명한 영역을 제거한 후, 수정된 이미지의 URL을 반환
  const ImageUrl = useRemoveTransparent(imageUrl);

  return (
    // 캔버스를 설정하고 카메라 위치, 배경색 등의 스타일을 적용
    <Canvas
      camera={{ position: [0, 0, 2] }}
      style={{ backgroundColor: "gray" }}
    >
      <ambientLight />
      <pointLight position={[10, 10, 10]} color="black" />
      <OrbitControls />
      // 이미지가 있는 경우에만 Medal 컴포넌트를 렌더링한다.
      {ImageUrl && <Medal imageUrl={ImageUrl} />}
      <Stars />
    </Canvas>
  );
};

export default MedalCanvas;
