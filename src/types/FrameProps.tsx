export interface FrameProps {
  frame: {
    id: string;
    name: string;
    medal_img: string;
    cover_img: string;
    title: string;
    event_disc: string;
    event_date: string;
    frame_img: string;
    likes: string;
    comments: string;
    tags: Array<string>;
  };
  isClicked: boolean;
}
