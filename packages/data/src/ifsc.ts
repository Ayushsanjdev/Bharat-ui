export interface IFSCEntry {
  bank: string;
  branch: string;
  address: string;
  city: string;
  state: string;
  contact: string;
}

// Popular branches only — covers common demos and top cities.
// For full lookup use a resolver backed by an API or the RBI dataset.
export const IFSC_DATA: Record<string, IFSCEntry> = {
  // SBI — top 10 cities
  SBIN0000300: { bank: "State Bank of India", branch: "Mumbai Main", address: "Mumbai Samachar Marg, Fort, Mumbai", city: "Mumbai", state: "Maharashtra", contact: "02222740443" },
  SBIN0000691: { bank: "State Bank of India", branch: "New Delhi Main", address: "11 Sansad Marg, New Delhi", city: "New Delhi", state: "Delhi", contact: "01123374390" },
  SBIN0001234: { bank: "State Bank of India", branch: "Vadodara Main", address: "RC Dutt Road, Alkapuri, Vadodara", city: "Vadodara", state: "Gujarat", contact: "02652234567" },
  SBIN0002030: { bank: "State Bank of India", branch: "Bengaluru Main", address: "St Marks Road, Bengaluru", city: "Bengaluru", state: "Karnataka", contact: "08022212636" },
  SBIN0003436: { bank: "State Bank of India", branch: "Hyderabad Main", address: "Bank Street, Koti, Hyderabad", city: "Hyderabad", state: "Telangana", contact: "04024754097" },
  SBIN0003681: { bank: "State Bank of India", branch: "Chennai Main", address: "NSC Bose Road, Chennai", city: "Chennai", state: "Tamil Nadu", contact: "04425353400" },
  SBIN0001522: { bank: "State Bank of India", branch: "Kolkata Main", address: "1 Strand Road, Kolkata", city: "Kolkata", state: "West Bengal", contact: "03322435541" },
  SBIN0011720: { bank: "State Bank of India", branch: "Ahmedabad Main", address: "Relief Road, Ahmedabad", city: "Ahmedabad", state: "Gujarat", contact: "07925506571" },
  SBIN0007588: { bank: "State Bank of India", branch: "Pune Main", address: "East Street, Pune Camp, Pune", city: "Pune", state: "Maharashtra", contact: "02026128989" },
  SBIN0003378: { bank: "State Bank of India", branch: "Jaipur Main", address: "Mirza Ismail Road, Jaipur", city: "Jaipur", state: "Rajasthan", contact: "01412377063" },
  // HDFC — top 8 cities
  HDFC0000240: { bank: "HDFC Bank", branch: "Nariman Point", address: "169 Backbay Reclamation, Nariman Point, Mumbai", city: "Mumbai", state: "Maharashtra", contact: "02222858900" },
  HDFC0001234: { bank: "HDFC Bank", branch: "Vadodara Race Course", address: "Race Course Circle, Vadodara", city: "Vadodara", state: "Gujarat", contact: "02652345678" },
  HDFC0000060: { bank: "HDFC Bank", branch: "Connaught Place", address: "Connaught Place, New Delhi", city: "New Delhi", state: "Delhi", contact: "01123413220" },
  HDFC0001530: { bank: "HDFC Bank", branch: "Koramangala", address: "80 Feet Road, Koramangala, Bengaluru", city: "Bengaluru", state: "Karnataka", contact: "08066006000" },
  HDFC0000084: { bank: "HDFC Bank", branch: "Begumpet", address: "Begumpet, Hyderabad", city: "Hyderabad", state: "Telangana", contact: "04027801234" },
  HDFC0000068: { bank: "HDFC Bank", branch: "Anna Nagar", address: "Anna Nagar, Chennai", city: "Chennai", state: "Tamil Nadu", contact: "04426151234" },
  HDFC0000013: { bank: "HDFC Bank", branch: "Park Street", address: "Park Street, Kolkata", city: "Kolkata", state: "West Bengal", contact: "03322271234" },
  HDFC0000270: { bank: "HDFC Bank", branch: "Pune Camp", address: "East Street, Pune Camp, Pune", city: "Pune", state: "Maharashtra", contact: "02026130194" },
  // ICICI — top 5 cities
  ICIC0000103: { bank: "ICICI Bank", branch: "Bandra West", address: "S V Road, Bandra West, Mumbai", city: "Mumbai", state: "Maharashtra", contact: "02226424201" },
  ICIC0001234: { bank: "ICICI Bank", branch: "Alkapuri Vadodara", address: "Alkapuri, Vadodara", city: "Vadodara", state: "Gujarat", contact: "02652456789" },
  ICIC0000002: { bank: "ICICI Bank", branch: "Connaught Place", address: "Connaught Place, New Delhi", city: "New Delhi", state: "Delhi", contact: "01123313335" },
  ICIC0000195: { bank: "ICICI Bank", branch: "MG Road Bengaluru", address: "MG Road, Bengaluru", city: "Bengaluru", state: "Karnataka", contact: "08025596663" },
  ICIC0000066: { bank: "ICICI Bank", branch: "Banjara Hills", address: "Road No 1 Banjara Hills, Hyderabad", city: "Hyderabad", state: "Telangana", contact: "04023608000" },
  // Axis — top 3 cities
  UTIB0000001: { bank: "Axis Bank", branch: "Ahmedabad Swastik", address: "Swastik Cross Road, Navrangpura, Ahmedabad", city: "Ahmedabad", state: "Gujarat", contact: "07926423010" },
  UTIB0000218: { bank: "Axis Bank", branch: "Mumbai Fort", address: "Maker Tower F, Cuffe Parade, Mumbai", city: "Mumbai", state: "Maharashtra", contact: "02222188005" },
  UTIB0000040: { bank: "Axis Bank", branch: "MG Road Bengaluru", address: "Manipal Centre, MG Road, Bengaluru", city: "Bengaluru", state: "Karnataka", contact: "08025321007" },
  // Kotak — top 3 cities
  KKBK0000001: { bank: "Kotak Mahindra Bank", branch: "Mumbai BKC", address: "27 BKC, Bandra East, Mumbai", city: "Mumbai", state: "Maharashtra", contact: "02261660001" },
  KKBK0000218: { bank: "Kotak Mahindra Bank", branch: "Connaught Place", address: "Connaught Place, New Delhi", city: "New Delhi", state: "Delhi", contact: "01144069001" },
  KKBK0000561: { bank: "Kotak Mahindra Bank", branch: "MG Road Bengaluru", address: "Prestige Meridian, MG Road, Bengaluru", city: "Bengaluru", state: "Karnataka", contact: "08043001001" },
};
