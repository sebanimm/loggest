import instance from "@/apis/instance";

export async function getAllUserIds() {
  const response = await instance.get("/user");
  return response.data;
}

export async function getUser(userId: string) {
  const response = await instance.get(`/user/${userId}`);
  return response.data;
}

export async function getUserPosts(userId: string) {
  const response = await instance.get(`/user/${userId}/posts`);
  return response.data;
}

export async function getAllPosts() {
  const response = await instance.get("/post");
  return response.data;
}

export async function getPost(postId: string | number) {
  const response = await instance.get(`/post/${postId}`);
  return response.data;
}

export async function createPost(data: any) {
  const response = await instance.post("/post", { data });
  return response.data;
}

export async function updatePost(postId: string | number, data: any) {
  const response = await instance.put(`/post/${postId}`, { data });
  return response.data;
}

export async function deletePost(postId: string | number) {
  const response = await instance.delete(`/post/${postId}`);
  return response.data;
}

export async function getStars(postId: string | number) {
  const response = await instance.get(`/post/${postId}/stars`);
  return response.data;
}

export async function createStar(postId: string | number) {
  const response = await instance.post(`/post/${postId}/star`);
  return response.data;
}

export async function deleteStar(postId: string | number) {
  const response = await instance.delete(`/post/${postId}/star`);
  return response.data;
}
