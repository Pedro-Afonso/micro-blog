export interface IPostCollection {
  id: string;
  body: string;
  createdAt: { seconds: number; nanoseconds: number };
  createdBy: string;
  image: string;
  tagsArray: string[];
  title: string;
  userId: string;
}
