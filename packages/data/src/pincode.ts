export interface PincodeEntry {
  district: string;
  state: string;
  zone: string;
  headPO: string;
}

export const PINCODE_DATA: Record<string, PincodeEntry> = {
  "390001": {
    district: "Vadodara",
    state: "Gujarat",
    zone: "Western",
    headPO: "Vadodara HO",
  },
  "400001": {
    district: "Mumbai",
    state: "Maharashtra",
    zone: "Western",
    headPO: "Mumbai GPO",
  },
  "110001": {
    district: "Central Delhi",
    state: "Delhi",
    zone: "Northern",
    headPO: "Delhi GPO",
  },
  "800001": {
    district: "Patna",
    state: "Bihar",
    zone: "Eastern",
    headPO: "Patna GPO",
  },
  "851101": {
    district: "Begusarai",
    state: "Bihar",
    zone: "Eastern",
    headPO: "Begusarai HO",
  },
};
