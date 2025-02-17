import { TYPE_COLOR_MAP } from "@/utils/config";

// Some guard fn to check if the type is valid
export const isValidType = (
  type: string,
): type is keyof typeof TYPE_COLOR_MAP => {
  return type in TYPE_COLOR_MAP;
};
