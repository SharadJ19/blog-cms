export interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  categoryId: number;
  tags: string[];
  date: string;
  thumbnail?: string;
}
