export interface UserProps {
  userId: string;
  username: string;
  profileUrl: string;
  password: string;
  bio: string;
  followers: Array<string>;
  following: Array<string>;
  createdAt: Date;
}
