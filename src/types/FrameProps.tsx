export interface FrameProps {
  frame: {
    _id: string;
    userId: string;
    username: string;
    title: string;
    medalUrl: Blob | string;
    photoUrls: FormData | Array<string>;
    caption: string;
    date: string;
    location: string;
    frameType: string;
    likes?: {
      totalLikes: number;
      userLikes: Array<string>;
    };
    comments?: Array<{
      username: string;
      text: string;
      createdAt: string | Date;
      totalComments: number;
    }>;
    tags?: Array<string>;
  };
  isClicked?: boolean;
  isActivated?: boolean;
}

export interface FrameInputProps {
  onSubmit: (data: Partial<FrameProps["frame"]>) => void;
  onPrevStep: () => void;
  onNextStep: () => void;
}
