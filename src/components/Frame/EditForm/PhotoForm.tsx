import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";

import { Player } from "@lottiefiles/react-lottie-player";
import { VscTriangleUp, VscTriangleDown } from "react-icons/vsc";
import { FaStar } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";

import { FrameInputProps } from "../../../types/FrameProps";

const PhotoForm: React.FC<FrameInputProps> = ({
  onSubmit,
  onPrevStep,
  onNextStep,
}) => {
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!uploadedPhotos) {
      alert("이미지를 선택해주세요.");
      return;
    }

    onSubmit({
      imageUrl: uploadedPhotos?.map((photo) => photo.preview) || [],
    });
    onNextStep();
  };

  return (
    <form
      className="h-full flex flex-col justify-center text-center space-y-6"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-bold break-keep text-center">
        기억하고 싶은 순간을 골라주세요
      </h2>
      <div className="my-auto">
        {!uploadedPhotos && (
          <div
            {...getRootProps()}
            className="flex flex-col justify-center items-center border-2 border-dashed border-gray-400 rounded-lg p-6 h-auto"
          >
            <input {...getInputProps({ hidden: true })} />
            <Player
              src="https://assets5.lottiefiles.com/packages/lf20_NxAJBy.json"
              background="transparent"
              style={{ height: "300px", width: "300px" }}
              autoplay={true}
              loop={true}
            ></Player>
            {isDragActive ? (
              <p className="break-keep">이미지를 drag 해주세요.</p>
            ) : (
              <p className="break-keep">
                이미지를 drag하거나 클릭해서 이미지를 선택해주세요.
              </p>
            )}
          </div>
        )}
        {uploadedPhotos && (
          <>
            {uploadedPhotos.map((file, index) => (
              <div key={file.name} className="flex items-center space-x-4 mt-2">
                <div className="flex flex-col items-center w-1 text-yellow-400 text-md">
                  {index === 0 && <FaStar />}
                </div>
                <div className="flex flex-col items-center w-6 text-md">
                  <p>{index + 1}</p>
                </div>
                <img
                  src={file.preview}
                  alt={file.name}
                  className="h-16 w-16 object-cover rounded-md cursor-pointer"
                  onClick={() => setCoverPhoto(index)}
                />

                <div className="flex space-x-3">
                  <button
                    onClick={() => moveUp(index)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                    disabled={index === 0}
                  >
                    <VscTriangleUp />
                  </button>
                  <button
                    onClick={() => moveDown(index)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                    disabled={index === 0}
                  >
                    <VscTriangleDown />
                  </button>
                  <button
                    onClick={() => removePhoto(index)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                  >
                    <RiDeleteBin5Line />
                  </button>
                </div>
              </div>
            ))}
          </>
        )}

        <div className={"flex justify-center space-x-8"}>
          <button
            type="submit"
            className={`rounded-lg px-4 py-2 mt-6 ${
              uploadedPhotos
                ? "bg-slate-300 text-slate-800 hover:bg-slate-400"
                : "bg-red-500 text-white hover:bg-red-600"
            }  transition-colors duration-150`}
            onClick={() => onPrevStep()}
          >
            이전
          </button>
          {uploadedPhotos && (
            <button
              type="submit"
              className="rounded-lg px-4 py-2 mt-6 bg-red-500 text-white hover:bg-red-600 transition-colors duration-150"
            >
              다음
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default PhotoForm;
