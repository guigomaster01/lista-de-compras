import { localStore } from "./local";
import { httpStore } from "./http";

export type Mode = "local" | "api";

export function getStore(mode: Mode) {
  return mode === "local" ? localStore : httpStore;
}
