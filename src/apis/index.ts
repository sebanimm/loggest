import instance from "@/apis/instance";
import type { APIResponse, Post, Star, User } from "@/types/schema";

export async function getAllUserIds() {
  const response = await instance.get<User["id"][]>("/user");
  return response.data;
}

export async function getUser(userId: string) {
  const response = await instance.get<User>(`/user/${userId}`);
  return response.data;
}

export async function getUserPosts(userId: string) {
  const response = await instance.get<Post[]>(`/user/${userId}/posts`);
  return response.data;
}

export async function getAllPosts() {
  const response = await instance.get<Post[]>("/post");
  return response.data;
}

export async function getPost(postId: string | number) {
  const response = await instance.get<Post>(`/post/${postId}`);
  return response.data;
}

export async function createPost(data: any) {
  const response = await instance.post<APIResponse>("/post", { data });
  return response.data;
}

export async function updatePost(postId: string | number, data: any) {
  const response = await instance.put<Post>(`/post/${postId}`, { data });
  return response.data;
}

export async function deletePost(postId: string | number) {
  const response = await instance.delete<APIResponse>(`/post/${postId}`);
  return response.data;
}

export async function getStars(postId: string | number) {
  const response = await instance.get<Star[]>(`/post/${postId}/stars`);
  return response.data;
}

export async function createStar(postId: string | number) {
  const response = await instance.post<APIResponse>(`/post/${postId}/star`);
  return response.data;
}

export async function deleteStar(postId: string | number) {
  const response = await instance.delete<APIResponse>(`/post/${postId}/star`);
  return response.data;
}
