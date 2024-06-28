import "dayjs/locale/ko";

import dayjs from "dayjs";

dayjs.locale("ko");

export const YYYYMMDD = (date: string) => {
  return dayjs(date).format("YYYY.MM.DD");
};
