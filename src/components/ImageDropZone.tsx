import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";

import { VscTriangleUp, VscTriangleDown } from "react-icons/vsc";
import { FaStar } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";

const ImageDropZone = () => {
  const [uploadedPhotos, setUploadedPhotos] = useState<Array<{
    name: string;
    preview: string;
  }> | null>(null);
  const [coverIndex, setCoverIndex] = useState<number | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newPhotos = acceptedFiles.map((file) => ({
      name: file.name,
      preview: URL.createObjectURL(file),
    }));
    setUploadedPhotos(newPhotos);
    setCoverIndex(0); // 새로운 이미지를 추가하면 첫번째 이미지를 대표 이미지로 설정
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
  });

  const removePhoto = (index: number) => {
    const newPhotos = [...(uploadedPhotos ?? [])];
    newPhotos.splice(index, 1);
    setUploadedPhotos(newPhotos.length ? newPhotos : null);
    if (coverIndex === index) {
      setCoverIndex(null); // 대표 이미지가 삭제된 경우 대표 이미지를 해제
    } else if (coverIndex !== null && index < coverIndex) {
      setCoverIndex(coverIndex - 1); // 대표 이미지의 인덱스를 조정
    }
  };

  const handlePhotoIndex = (index: number) => {
    setCoverIndex(index);
  };

  /**
   * @description - 대표 이미지를 설정을 위한 함수. 클릭한 이미지를 대표 이미지로 설정 (index 0인 대표 이미지와 클릭한 이미지의 index를 바꿔줌)
   * @param index - 클릭한 이미지의 인덱스
   */
  const setCoverPhoto = (index: number) => {
    if (index !== 0 && uploadedPhotos) {
      const newPhotos = [...uploadedPhotos];
      [newPhotos[0], newPhotos[index]] = [newPhotos[index], newPhotos[0]];
      setUploadedPhotos(newPhotos);
      setCoverIndex(0);
    } else {
      setCoverIndex(index);
    }
  };

  const moveUp = (index: number) => {
    if (index > 0) {
      const newPhotos = [...(uploadedPhotos ?? [])];
      [newPhotos[index - 1], newPhotos[index]] = [
        newPhotos[index],
        newPhotos[index - 1],
      ];
      setUploadedPhotos(newPhotos);
      if (coverIndex === index) {
        handlePhotoIndex(index - 1);
      } else if (coverIndex === index - 1) {
        handlePhotoIndex(index);
      }
    }
  };

  const moveDown = (index: number) => {
    if (uploadedPhotos && index < uploadedPhotos.length - 1) {
      const newPhotos = [...(uploadedPhotos ?? [])];
      [newPhotos[index], newPhotos[index + 1]] = [
        newPhotos[index + 1],
        newPhotos[index],
      ];
      setUploadedPhotos(newPhotos);
      if (coverIndex === index) {
        handlePhotoIndex(index + 1);
      } else if (coverIndex === index + 1) {
        handlePhotoIndex(index);
      }
    }
  };

  return (
    <section className="flex flex-col items-center text-center h-full">
      <h2 className="text-2xl font-bold break-keep">
        기억하고 싶은 순간을 기록하세요
      </h2>
      <form className="my-auto">
        {!uploadedPhotos && (
          <div
            {...getRootProps()}
            className="relative flex flex-col justify-around items-center border-2 border-dashed border-gray-400 rounded-lg p-4 w-64 h-56"
          >
            <input {...getInputProps({ hidden: true, disabled: true })} />
            {isDragActive ? (
              <p>이미지를 drag 해주세요.</p>
            ) : (
              <p>이미지를 drag하거나 클릭해서 이미지를 선택해주세요.</p>
            )}
          </div>
        )}
        {uploadedPhotos && (
          <>
            {uploadedPhotos.map((file, index) => (
              // 만약 index가 0이면 대표이미지 표시
              <div
                key={file.name}
                className="flex justify-center items-center mt-2"
              >
                <div className="flex flex-col items-center w-8 text-yellow-400 text-md">
                  {index === 0 && <FaStar />}
                </div>
                <div className="flex flex-col items-center w-8 text-md">
                  <p>{index + 1}</p>
                </div>
                <img
                  src={file.preview}
                  alt={file.name}
                  className="h-16 w-16 object-cover rounded-md mr-10 cursor-pointer"
                  onClick={() => setCoverPhoto(index)}
                />
                <button
                  onClick={() => removePhoto(index)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded mr-4"
                >
                  <RiDeleteBin5Line />
                </button>
                <button
                  onClick={() => moveUp(index)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                  disabled={index === 0}
                >
                  <VscTriangleUp />
                </button>
                <button
                  onClick={() => moveDown(index)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                  disabled={index === 0}
                >
                  <VscTriangleDown />
                </button>
              </div>
            ))}
          </>
        )}
      </form>
    </section>
  );
};

export default ImageDropZone;
