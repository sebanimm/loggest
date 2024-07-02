"use server";

import { deletePost } from "@/apis";
import { signIn, signOut } from "@/auth";

export async function singInAction() {
  await signIn();
}

export async function singOutAction() {
  await signOut();
}

export async function deletePostAction(postId: string) {
  await deletePost(postId);
}
