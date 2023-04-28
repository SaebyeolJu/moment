import React, { useState, useContext } from "react";

import PhotoForm from "../containers/Frame/EditForm/PhotoForm";
import MedalForm from "../containers/Frame/EditForm/MedalForm";
import TitleForm from "../containers/Frame/EditForm/TitleForm";
import InfoForm from "../containers/Frame/EditForm/InfoForm";
import FrameForm from "../containers/Frame/EditForm/FrameForm";
import FinalForm from "../containers/Frame/EditForm/FinalForm";

import FrameTypeBtn from "../components/Frame/FrameTypeBtn";

import { FrameProps } from "../types/FrameProps";

import { AuthContext } from "../context/AuthContext";

const Editing = () => {
  const { state: authState } = useContext(AuthContext);

  const [step, setStep] = useState(0);
  const [frameInfo, setFrameInfo] = useState<FrameProps>({
    frame: {
      _id: "",
      userId: authState!.user!.userId,
      username: authState!.user!.username,
      title: "",
      medalUrl: "",
      photoUrls: new FormData(),
      caption: "",
      date: "",
      location: "",
      frameType: "1",
    },
  });

  const handleSubmit = (data: Partial<FrameProps["frame"]>) => {
    setFrameInfo((prevState) => ({
      ...prevState,
      frame: {
        ...prevState.frame,
        ...data,
      },
    }));
  };

  const onPrevStep = () => setStep(step - 1);
  const onNextStep = () => setStep(step + 1);

  const sections = [
    {
      key: "title",
      component: (
        <TitleForm
          onSubmit={handleSubmit}
          onNextStep={onNextStep}
          onPrevStep={onPrevStep}
        />
      ),
    },
    {
      key: "info",
      component: (
        <InfoForm
          onSubmit={handleSubmit}
          onPrevStep={onPrevStep}
          onNextStep={onNextStep}
        />
      ),
    },
    {
      key: "medal",
      component: (
        <MedalForm
          onSubmit={handleSubmit}
          onPrevStep={onPrevStep}
          onNextStep={onNextStep}
        />
      ),
    },
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
    {
      key: "frame",
      component: (
        <FrameForm
          onSubmit={handleSubmit}
          onPrevStep={onPrevStep}
          onNextStep={onNextStep}
        />
      ),
    },
    {
      key: "final",
      component: <FinalForm frameInfo={frameInfo} onPrevStep={onPrevStep} />,
    },
  ];

  return (
    <div className="flex flex-col mt-12 text-center justify-center w-screen items-center dark:text-white">
      <FrameTypeBtn setStep={setStep} />
      {sections[step].component}
    </div>
  );
};

export default Editing;
