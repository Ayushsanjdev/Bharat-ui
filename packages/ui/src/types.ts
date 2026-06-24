export interface PincodeData {
  district?: string;
  state: string;
  zone?: string;
  headPO?: string;
}

export type PincodeResolver = (pincode: string) => Promise<PincodeData | null>;

export interface IFSCData {
  bank: string;
  branch?: string;
  address?: string;
  city?: string;
  state?: string;
  contact?: string;
}

export type IFSCResolver = (ifsc: string) => Promise<IFSCData | null>;
