import { httpRequest } from "@/apis/httpRequest";
import type {
  APIResponse,
  CreatePostData,
  Post,
  Star,
  UpdatePostData,
  User,
} from "@/types/schema";

export async function getAllUserIds() {
  return await httpRequest<User["id"][]>({ method: "GET", url: "/user" });
}

export async function getUser(userId: string) {
  return await httpRequest<User>({ method: "GET", url: `/user/${userId}` });
}

export async function getUserPosts(userId: string) {
  return await httpRequest<Post[]>({
    method: "GET",
    url: `/user/${userId}/posts`,
  });
}

export async function getAllPosts() {
  return await httpRequest<Post[]>({ method: "GET", url: "/post" });
}

export async function getPost(postId: string | number) {
  return await httpRequest<Post>({ method: "GET", url: `/post/${postId}` });
}

export async function createPost(data: CreatePostData) {
  return await httpRequest<APIResponse>({ method: "POST", url: "/post", data });
}

export async function updatePost(
  postId: string | number,
  data: UpdatePostData,
) {
  return await httpRequest<Post>({
    method: "PUT",
    url: `/post/${postId}`,
    data,
  });
}

export async function deletePost(postId: string | number) {
  return await httpRequest<APIResponse>({
    method: "DELETE",
    url: `/post/${postId}`,
  });
}

export async function getStars(postId: string | number) {
  return await httpRequest<Star[]>({
    method: "GET",
    url: `/post/${postId}/stars`,
  });
}

export async function createStar(userId: string, postId: string | number) {
  return await httpRequest<APIResponse>({
    method: "POST",
    url: `/post/${postId}/star`,
    data: { userId },
  });
}

export async function deleteStar(userId: string, postId: string | number) {
  return await httpRequest<APIResponse>({
    method: "DELETE",
    url: `/post/${postId}/star`,
    data: { userId },
  });
}
