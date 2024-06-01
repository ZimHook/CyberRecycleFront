import { atom } from "recoil";

export const Chains = atom({
  key: 'Chains', // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});