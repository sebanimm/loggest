import { type AxiosRequestConfig, isAxiosError } from "axios";

import instance from "@/apis/instance";

export async function httpRequest<T>(config: AxiosRequestConfig) {
  try {
    const { data } = await instance.request<T>(config);

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "API 호출 실패");
    }

    throw error;
  }
}
