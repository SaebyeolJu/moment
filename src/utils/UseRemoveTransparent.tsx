import { useState, useEffect } from "react";

type UseRemoveTransparent = (imageUrl: string) => string | null;

/**
 * @description - 이미지의 투명한 영역을 제거하는 hook
 * @param imageUrl - 제거할 투명 영역이 있는 이미지 URL
 * @returns - 투명한 부분이 제거된 이미지 URL
 */
const useRemoveTransparent: UseRemoveTransparent = (imageUrl) => {
  const [modifiedImageUrl, setModifiedImageUrl] = useState<string | null>(null);

  useEffect(() => {
    // 투명한 영역을 제거하는 비동기 함수 선언
    const removeTransparent = async (imageUrl: string): Promise<string> => {
      return new Promise((resolve) => {
        // 이미지 로드
        const image = new Image();
        image.src = imageUrl;

        // 이미지 로드 완료 시 실행
        image.onload = () => {
          // 캔버스 생성 및 컨텍스트 설정
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");

          // 캔버스 크기 설정
          canvas.width = image.width;
          canvas.height = image.height;

          // 이미지를 캔버스에 그림
          context!.drawImage(image, 0, 0);

          // 이미지 데이터 추출
          const imageData = context!.getImageData(
            0,
            0,
            image.width,
            image.height
          );
          const data = imageData.data;

          // 상단 및 하단 Y 좌표 초기화
          let topY = image.height;
          let bottomY = 0;

          // 투명 영역 찾기
          for (let y = 0; y < image.height; y++) {
            for (let x = 0; x < image.width; x++) {
              const index = (y * image.width + x) * 4;

              // 투명이 아닌 픽셀의 경우, 상단 및 하단 Y 좌표 업데이트
              if (data[index + 3] !== 0) {
                if (y < topY) topY = y;
                if (y > bottomY) bottomY = y;
              }
            }
          }

          // 빈 부분이 제거 되었기 때문에 새 높이 계산
          const newHeight = bottomY - topY + 1;

          // 자른 이미지를 위한 새 캔버스 생성 및 컨텍스트 설정
          const croppedCanvas = document.createElement("canvas");
          const croppedContext = croppedCanvas.getContext("2d");

          croppedCanvas.width = image.width;
          croppedCanvas.height = newHeight;

          // 이미지를 새 캔버스에 잘라서 그림
          croppedContext!.drawImage(
            image,
            0,
            topY,
            image.width,
            newHeight,
            0,
            0,
            image.width,
            newHeight
          );

          // 결과 이미지를 Data URL로 반환하고 resolve 함수 호출하여 Promise 완료
          resolve(croppedCanvas.toDataURL());
        };
      });
    };

    // 이미지 URL이 있는 경우 투명한 영역을 제거한 후 수정된 이미지 URL 설정
    if (imageUrl) {
      removeTransparent(imageUrl).then((croppedImageUrl) => {
        setModifiedImageUrl(croppedImageUrl);
      });
    }
  }, [imageUrl]);

  return modifiedImageUrl;
};

export default useRemoveTransparent;
