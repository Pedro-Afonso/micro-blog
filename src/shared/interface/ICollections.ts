export interface IPostCollection {
  body: string;
  createdAt: { seconds: string; nanoseconds: string };
  createdBy: string;
  image: string;
  tagsArray: string[];
  title: string;
  userId: string;
}
