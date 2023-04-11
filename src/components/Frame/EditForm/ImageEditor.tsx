import React, { useState, useRef, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Tooltip } from "react-tooltip";

import { Player } from "@lottiefiles/react-lottie-player";
import { TbEraser, TbEraserOff } from "react-icons/tb";
import { FiRefreshCw } from "react-icons/fi";
import { BiImageAdd } from "react-icons/bi";

import { FrameInputProps } from "../../../types/FrameProps";
import useRemoveTransparentHook from "../../../utils/useRemoveTransparentHook";
import "react-tooltip/dist/react-tooltip.css";

const ImageEditor: React.FC<FrameInputProps> = ({
  onSubmit,
  onPrevStep,
  onNextStep,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext("2d");
        if (canvas && context) {
          context.clearRect(0, 0, canvas.width, canvas.height);
          context.drawImage(img, 0, 0, canvas.width, canvas.height);
          setImage(img);
          resizeImage();
        }
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  };

  const resizeImage = () => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    const img = image;
    if (!canvas || !context || !img) return;

    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = img.width / img.height;

    let newWidth, newHeight;
    if (imgRatio > canvasRatio) {
      newWidth = canvas.width;
      newHeight = newWidth / imgRatio;
    } else {
      newHeight = canvas.height;
      newWidth = newHeight * imgRatio;
    }

    canvas.width = newWidth;
    canvas.height = newHeight;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(img, 0, 0, newWidth, newHeight);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isEditing || !image) return;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (context) {
      const { left, top } = canvas!.getBoundingClientRect();
      const x = e.clientX - left;
      const y = e.clientY - top;
      console.log("mouse Move : ", e.clientX, e.clientY, x, y);

      context.beginPath();
      context.arc(x, y, 10, 0, Math.PI * 2, false);
      context.fill();
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (canvas && context && image) {
      resizeImage();
      context.fillRect(0, 0, canvas!.width, canvas!.height);
      context.fillStyle = "white";
    }
  }, [windowSize]);

  const handleEditClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsEditing(!isEditing);
  };

  const handleImageResetClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const canvas = canvasRef.current;
    const context = canvas!.getContext("2d");
    const img = new Image();
    img.onload = () => {
      if (canvas && context) {
        context.globalCompositeOperation = "source-over"; // 초기화 추가
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
        setIsEditing(false);
      }
    };
    img.src = image!.src;
  };

  const handleResetClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const canvas = canvasRef.current;
    const context = canvas!.getContext("2d");
    if (context) {
      context.globalCompositeOperation = "source-over"; // 초기화 추가
      context.clearRect(0, 0, canvas!.width, canvas!.height);
    }
    setImage(null);
    setIsEditing(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!image || !canvasRef.current) {
      alert("이미지를 업로드해주세요.");
      return;
    }

    const canvas = canvasRef.current;
    const dataUrl = canvas.toDataURL("image/png");
    const editedImage = dataUrl.replace(/^data:image\/(png|jpg);base64,/, "");

    onSubmit({ medalUrl: editedImage });
    onNextStep();
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <form
      className="h-full flex flex-col justify-center text-center space-y-6"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-bold text-gray-700 break-keep">
        영광의 메달을 올려주세요!
      </h2>
      {image && (
        <p className="text-gray-600 break-keep">
          메달의 배경은 터치해서 지워주세요!
        </p>
      )}
      <div
        {...getRootProps()}
        className={`${
          image ? "hidden" : "block"
        } flex flex-col justify-center items-center border-2 border-dashed border-gray-400 rounded-lg p-6 h-auto`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <>
            <Player
              src="https://assets5.lottiefiles.com/packages/lf20_NxAJBy.json"
              background="transparent"
              style={{ height: "300px", width: "300px" }}
              autoplay={true}
              loop={true}
            ></Player>
            <p className="text-gray-600">이미지를 드래그 해주세요.</p>
          </>
        ) : (
          <>
            <Player
              src="https://assets7.lottiefiles.com/packages/lf20_SC3bWlmCAz.json"
              background="transparent"
              style={{ height: "300px", width: "300px" }}
              autoplay={true}
              loop={true}
            ></Player>
            <p className="text-gray-600">
              이미지를 드래그하거나 클릭해서 이미지를 선택해주세요.
            </p>
          </>
        )}
      </div>
      <canvas
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        style={{
          border: "1px solid black h-full",
        }}
        className={`${image ? "block" : "hidden"}`}
      />

      {image && (
        <>
          <div className="flex justify-center">
            <button
              className="btn-edit bg-gray-200 hover:bg-gray-300 rounded-full"
              onClick={handleEditClick}
              data-tooltip-id="edit-tooltip"
              data-tooltip-content={`${
                isEditing ? "수정 시작" : "수정 멈추기"
              }`}
              data-tooltip-place="bottom"
            >
              {isEditing ? <TbEraser /> : <TbEraserOff />}
            </button>
            <button
              className="btn-edit bg-gray-200 hover:bg-gray-300 rounded-full"
              onClick={handleImageResetClick}
              data-tooltip-id="edit-tooltip"
              data-tooltip-content="Image Edit Reset"
              data-tooltip-place="bottom"
            >
              <FiRefreshCw />
            </button>
            <button
              className="btn-edit bg-gray-200 hover:bg-gray-300 rounded-full"
              onClick={handleResetClick}
              data-tooltip-id="edit-tooltip"
              data-tooltip-content="Image Reset"
              data-tooltip-place="bottom"
            >
              <BiImageAdd />
            </button>
            <Tooltip id="edit-tooltip" />
          </div>
        </>
      )}

      <div className="flex justify-around">
        <button
          type="submit"
          className={`${
            image
              ? " bg-slate-300 text-slate-800 hover:bg-slate-400"
              : "bg-red-500 text-white hover:bg-red-600"
          } rounded-lg px-4 py-2 mt-6 transition-colors duration-150`}
          onClick={() => onPrevStep()}
        >
          이전
        </button>
        {image && (
          <button
            type="submit"
            className="rounded-lg px-4 py-2 mt-6 bg-red-500 text-white hover:bg-red-600 transition-colors duration-150"
          >
            다음
          </button>
        )}
      </div>
    </form>
  );
};

export default ImageEditor;
