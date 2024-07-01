export interface APIResponse {
  message: string;
  status: number;
}

export interface User {
  id: string;
  name?: string;
  email: string;
  emailVerified?: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Post {
  id: number;
  createdAt: string;
  image?: string;
  title: string;
  content: string;
  description: string;
  authorId: string;
}

export interface Star {
  userId: string;
  postId: number;
}

export interface UserReadPost {
  readAt: string;
  userId: string;
  postId: number;
}

export interface Comment {
  content: string;
  userId: string;
  postId: number;
}
