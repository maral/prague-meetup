import { CoopState } from "@/state/coopState";
import { encodeBooleans } from "./boolArrayCodec";

export const encodeStateToUrl = (state: CoopState): string => {
  const boolArray = Object.values(state);
  const encodedBooleans = encodeBooleans(boolArray);
  return encodedBooleans;
};
