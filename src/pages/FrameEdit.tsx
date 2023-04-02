import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";

import PhotoForm from "../components/FrameEditForm/PhotoForm";
import ImageEditor from "../components/FrameEditForm/ImageEditor";
import NameForm from "../components/FrameEditForm/NameForm";
import InfoForm from "../components/FrameEditForm/InfoForm";
import FrameForm from "../components/FrameEditForm/FrameForm";

import { FrameProps } from "../types/FrameProps";

const FrameEdit = () => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [step, setStep] = useState(0);
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

  const handleSubmit = (data: Partial<FrameProps>) => {
    setFrameInfo((prevState) => ({
      ...prevState,
      frame: {
        ...prevState.frame,
        ...data,
      },
    }));
    console.log(frameInfo);
  };

  const onPrevStep = () => setStep(step - 1);
  const onNextStep = () => {
    if (step === 4) {
      setShowConfetti(true);
    } else {
      setStep(step + 1);
    }
  };

  const sections = [
    // {
    //   key: "name",
    //   component: <NameForm onSubmit={handleSubmit} onNextStep={onNextStep} />,
    // },
    // {
    //   key: "info",
    //   component: (
    //     <InfoForm
    //       onSubmit={handleSubmit}
    //       onPrevStep={onPrevStep}
    //       onNextStep={onNextStep}
    //     />
    //   ),
    // },
    // {
    //   key: "medal",
    //   component: (
    //     <ImageEditor
    //       onSubmit={handleSubmit}
    //       onPrevStep={onPrevStep}
    //       onNextStep={onNextStep}
    //     />
    //   ),
    // },
    {
      key: "photo",
      component: (
        <PhotoForm
          onSubmit={handleSubmit}
          onPrevStep={onPrevStep}
          onNextStep={onNextStep}
        />
      ),
    },
    // {
    //   key: "frame",
    //   component: (
    //     <FrameForm
    //       onSubmit={handleSubmit}
    //       onPrevStep={onPrevStep}
    //       onNextStep={onNextStep}
    //     />
    //   ),
    // },
  ];

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (showConfetti) {
      timeout = setTimeout(() => {
        setShowConfetti(false);
      }, 5000);
    }
    return () => clearTimeout(timeout);
  }, [showConfetti]);

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="flex items-center justify-center space-x-8">
        <h1 className="text-2xl font-bold">{step + 1} / 4</h1>{" "}
      </div>
      <div className="h-full flex items-center justify-center">
        {sections[step].component}
      </div>
    </div>
  );
};

export default FrameEdit;
