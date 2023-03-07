import type { Timestamp } from "firebase/firestore";
export default interface Post {
  authorId: string;
  content: string;
  date: Timestamp;
  excerpt: string;
  imageUrl: string;
  modified: Timestamp;
  slug: string;
  status: string;
  title: string;
  postId: string;
}
