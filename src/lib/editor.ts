import { Node } from "slate";

export const serialize = (value: any) => {
  return value.map((n: any) => Node.string(n)).join("\n");
};

export const deserialize = (string: any) => {
  return string.split("\n").map((line: any) => {
    return {
      children: [{ text: line }],
    };
  });
};
