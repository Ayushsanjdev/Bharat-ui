"use client";

import { PINCODE_DATA, PINCODE_PREFIX } from "@bharat-ui/data/pincode";
import { IFSC_DATA } from "@bharat-ui/data/ifsc";
import type { PincodeData, IFSCData } from "./types";

// Bundled resolvers — backed by the small popular dataset in @bharat-ui/data.
// Bundle cost: ~8KB. Import only if you want offline/zero-config lookup.
// For full coverage swap with an API-backed resolver instead.

export const bundledPincodeResolver = async (pincode: string): Promise<PincodeData | null> => {
  const entry = PINCODE_DATA[pincode];
  if (entry) return entry;
  const prefix = pincode.slice(0, 2);
  const prefixEntry = PINCODE_PREFIX[prefix];
  return prefixEntry ?? null;
};

export const bundledIFSCResolver = async (ifsc: string): Promise<IFSCData | null> => {
  return IFSC_DATA[ifsc.toUpperCase()] ?? null;
};
