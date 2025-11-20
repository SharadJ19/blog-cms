export interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  categoryId: string;
  tags: string[];
  date: string;
  thumbnail?: string;
}
