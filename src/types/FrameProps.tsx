export interface FrameProps {
  frame: {
    id: string;
    name: string;
    title: string;
    medalImg: string;
    coverImg: Array<string>;
    caption: string;
    date: string | Date;
    location: string;
    frameType: number;
    likes: number;
    comments: number;
    tags: Array<string>;
  };
  isClicked: boolean;
}

export interface FrameInputProps {
  onSubmit: (frameInfo: FrameProps) => void;
  onPrevStep: () => void;
  onNextStep: () => void;
}
