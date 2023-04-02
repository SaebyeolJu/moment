import React, { useState, useRef, useEffect } from "react";
import { useDropzone } from "react-dropzone";

import { TbEraser, TbEraserOff } from "react-icons/tb";
import { FiRefreshCw } from "react-icons/fi";
import { BiImageAdd } from "react-icons/bi";

import { FrameProps, FrameInputProps } from "../../types/FrameProps";
import useRemoveTransparentHook from "../../utils/useRemoveTransparentHook";

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
  const [frameInfo, setFrameInfo] = useState<FrameProps>({
    frame: {
      id: "",
      name: "",
      medalImg: "",
      coverImg: [],
      title: "",
      caption: "",
      date: new Date(),
      location: "",
      frameType: 0,
      likes: 0,
      comments: 0,
      tags: [],
    },
    isClicked: false,
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

    setFrameInfo((prevFrameInfo) => ({
      ...prevFrameInfo,
      frame: {
        ...prevFrameInfo.frame,
        medalImg: editedImage || "",
      },
    }));

    onSubmit(frameInfo);
    onNextStep();
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <form
      className="h-full flex flex-col justify-center text-center space-y-6"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-bold text-gray-700">
        기억하고 싶은 순간을 선택해주세요
      </h2>
      {image && (
        <p className="text-gray-600">메달의 배경은 터치해서 지워주세요!</p>
      )}
      <div
        {...getRootProps()}
        className={`${
          image ? "hidden" : "block"
        } flex flex-col justify-center items-center border-2 border-dashed border-gray-400 rounded-lg p-6 h-auto`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-gray-600">이미지를 드래그 해주세요.</p>
        ) : (
          <p className="text-gray-600">
            이미지를 드래그하거나 클릭해서 이미지를 선택해주세요.
          </p>
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
          <div className="flex justify-center space-x-4">
            <button
              className="btn-edit p-2 bg-gray-200 hover:bg-gray-300 rounded-full transition-all"
              onClick={handleEditClick}
            >
              {isEditing ? <TbEraser /> : <TbEraserOff />}
            </button>
            <button
              className="btn-edit p-2 bg-gray-200 hover:bg-gray-300 rounded-full"
              onClick={handleImageResetClick}
            >
              <FiRefreshCw />
            </button>
            <button
              className="btn-edit p-2 bg-gray-200 hover:bg-gray-300 rounded-full"
              onClick={handleResetClick}
            >
              <BiImageAdd />
            </button>
          </div>
        </>
      )}

      <div className="flex justify-around">
        <button
          type="submit"
          className="bg-blue-600 text-white rounded-lg py-2 px-6 mt-6 transition-all hover:bg-blue-700"
          onClick={() => onPrevStep()}
        >
          이전
        </button>
        <button
          type="submit"
          className="bg-blue-600 text-white rounded-lg py-2 px-6 mt-6 transition-all hover:bg-blue-700"
        >
          다음
        </button>
      </div>
    </form>
  );
};

export default ImageEditor;
