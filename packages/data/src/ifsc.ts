export interface IFSCEntry {
  bank: string;
  branch: string;
  address: string;
  city: string;
  state: string;
  contact: string;
}

export const IFSC_DATA: Record<string, IFSCEntry> = {
  SBIN0001234: {
    bank: "State Bank of India",
    branch: "Vadodara Main",
    address: "Vadodara Main Branch, RC Dutt Road",
    city: "Vadodara",
    state: "Gujarat",
    contact: "02652234567",
  },
  HDFC0001234: {
    bank: "HDFC Bank",
    branch: "Vadodara",
    address: "Race Course Circle, Vadodara",
    city: "Vadodara",
    state: "Gujarat",
    contact: "02652345678",
  },
  ICIC0001234: {
    bank: "ICICI Bank",
    branch: "Alkapuri Vadodara",
    address: "Alkapuri, Vadodara",
    city: "Vadodara",
    state: "Gujarat",
    contact: "02652456789",
  },
};
