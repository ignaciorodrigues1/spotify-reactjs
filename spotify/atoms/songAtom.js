import { atom } from "recoil";
import { isWeakMap } from "lodash";

export const currentTrackIdState = atom({
  key: "currentTrackIdState", // unique ID (with respect to other atoms/selectors)
  default: null, //default value (initial value) 
});

export const isPlayingState = atom({
  key: "isPlayingState",
  default: false,
})