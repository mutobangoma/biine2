// src/firebase/firestore/index.js
export * from "./stores";
export * from "./ads";

// Convenience default exports (optional)
import * as stores from "./stores";
import * as ads from "./ads";

export const Firestore = {
  stores,
  ads,
};
