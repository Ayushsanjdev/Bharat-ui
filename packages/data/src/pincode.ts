export interface PincodeEntry {
  district?: string;
  state: string;
  zone: string;
  headPO?: string;
}

export interface PincodePrefixEntry {
  state: string;
  zone: string;
}

// 2-digit prefix → state + zone for all valid Indian pincodes.
// Used as fallback when a pincode isn't in the popular dataset.
export const PINCODE_PREFIX: Record<string, PincodePrefixEntry> = {
  "11": { state: "Delhi", zone: "Northern" },
  "12": { state: "Haryana", zone: "Northern" },
  "13": { state: "Punjab", zone: "Northern" },
  "14": { state: "Punjab", zone: "Northern" },
  "15": { state: "Punjab", zone: "Northern" },
  "16": { state: "Chandigarh", zone: "Northern" },
  "17": { state: "Himachal Pradesh", zone: "Northern" },
  "18": { state: "Jammu & Kashmir", zone: "Northern" },
  "19": { state: "Jammu & Kashmir", zone: "Northern" },
  "20": { state: "Uttar Pradesh", zone: "Northern" },
  "21": { state: "Uttar Pradesh", zone: "Northern" },
  "22": { state: "Uttar Pradesh", zone: "Northern" },
  "23": { state: "Uttar Pradesh", zone: "Northern" },
  "24": { state: "Uttarakhand", zone: "Northern" },
  "25": { state: "Uttar Pradesh", zone: "Northern" },
  "26": { state: "Uttar Pradesh", zone: "Northern" },
  "27": { state: "Uttar Pradesh", zone: "Northern" },
  "28": { state: "Uttar Pradesh", zone: "Northern" },
  "30": { state: "Rajasthan", zone: "Western" },
  "31": { state: "Rajasthan", zone: "Western" },
  "32": { state: "Rajasthan", zone: "Western" },
  "33": { state: "Rajasthan", zone: "Western" },
  "34": { state: "Rajasthan", zone: "Western" },
  "36": { state: "Gujarat", zone: "Western" },
  "37": { state: "Gujarat", zone: "Western" },
  "38": { state: "Gujarat", zone: "Western" },
  "39": { state: "Gujarat", zone: "Western" },
  "40": { state: "Maharashtra", zone: "Western" },
  "41": { state: "Maharashtra", zone: "Western" },
  "42": { state: "Maharashtra", zone: "Western" },
  "43": { state: "Maharashtra", zone: "Western" },
  "44": { state: "Maharashtra", zone: "Western" },
  "45": { state: "Madhya Pradesh", zone: "Western" },
  "46": { state: "Madhya Pradesh", zone: "Western" },
  "47": { state: "Madhya Pradesh", zone: "Western" },
  "48": { state: "Madhya Pradesh", zone: "Western" },
  "49": { state: "Chhattisgarh", zone: "Western" },
  "50": { state: "Telangana", zone: "Southern" },
  "51": { state: "Telangana", zone: "Southern" },
  "52": { state: "Andhra Pradesh", zone: "Southern" },
  "53": { state: "Andhra Pradesh", zone: "Southern" },
  "56": { state: "Karnataka", zone: "Southern" },
  "57": { state: "Karnataka", zone: "Southern" },
  "58": { state: "Karnataka", zone: "Southern" },
  "59": { state: "Karnataka", zone: "Southern" },
  "60": { state: "Tamil Nadu", zone: "Southern" },
  "61": { state: "Tamil Nadu", zone: "Southern" },
  "62": { state: "Tamil Nadu", zone: "Southern" },
  "63": { state: "Tamil Nadu", zone: "Southern" },
  "64": { state: "Tamil Nadu", zone: "Southern" },
  "65": { state: "Tamil Nadu", zone: "Southern" },
  "66": { state: "Kerala", zone: "Southern" },
  "67": { state: "Kerala", zone: "Southern" },
  "68": { state: "Kerala", zone: "Southern" },
  "69": { state: "Kerala", zone: "Southern" },
  "70": { state: "West Bengal", zone: "Eastern" },
  "71": { state: "West Bengal", zone: "Eastern" },
  "72": { state: "West Bengal", zone: "Eastern" },
  "73": { state: "West Bengal", zone: "Eastern" },
  "74": { state: "West Bengal", zone: "Eastern" },
  "75": { state: "Odisha", zone: "Eastern" },
  "76": { state: "Odisha", zone: "Eastern" },
  "77": { state: "Odisha", zone: "Eastern" },
  "78": { state: "Assam", zone: "Eastern" },
  "79": { state: "Assam", zone: "Eastern" },
  "80": { state: "Bihar", zone: "Eastern" },
  "81": { state: "Bihar", zone: "Eastern" },
  "82": { state: "Jharkhand", zone: "Eastern" },
  "83": { state: "Jharkhand", zone: "Eastern" },
  "84": { state: "Bihar", zone: "Eastern" },
  "85": { state: "Bihar", zone: "Eastern" },
};

// Popular pincodes only — covers major metros and common demo inputs.
// For full district/headPO lookup use a resolver backed by an API.
export const PINCODE_DATA: Record<string, PincodeEntry> = {
  // Delhi
  "110001": { district: "Central Delhi", state: "Delhi", zone: "Northern", headPO: "Delhi GPO" },
  "110005": { district: "Central Delhi", state: "Delhi", zone: "Northern", headPO: "Karol Bagh HO" },
  "110016": { district: "South Delhi", state: "Delhi", zone: "Northern", headPO: "Hauz Khas HO" },
  "110034": { district: "North West Delhi", state: "Delhi", zone: "Northern", headPO: "Pitampura HO" },
  "110045": { district: "South West Delhi", state: "Delhi", zone: "Northern", headPO: "Dwarka Sector 10 HO" },
  "110085": { district: "North West Delhi", state: "Delhi", zone: "Northern", headPO: "Rohini HO" },
  // Mumbai
  "400001": { district: "Mumbai City", state: "Maharashtra", zone: "Western", headPO: "Mumbai GPO" },
  "400050": { district: "Mumbai Suburban", state: "Maharashtra", zone: "Western", headPO: "Bandra HO" },
  "400058": { district: "Mumbai Suburban", state: "Maharashtra", zone: "Western", headPO: "Malad West HO" },
  "400069": { district: "Mumbai Suburban", state: "Maharashtra", zone: "Western", headPO: "Mulund East HO" },
  "400076": { district: "Mumbai Suburban", state: "Maharashtra", zone: "Western", headPO: "Ghatkopar West HO" },
  "400101": { district: "Thane", state: "Maharashtra", zone: "Western", headPO: "Thane West HO" },
  // Bengaluru
  "560001": { district: "Bengaluru Urban", state: "Karnataka", zone: "Southern", headPO: "Bengaluru GPO" },
  "560034": { district: "Bengaluru Urban", state: "Karnataka", zone: "Southern", headPO: "Marathahalli HO" },
  "560048": { district: "Bengaluru Urban", state: "Karnataka", zone: "Southern", headPO: "Whitefield HO" },
  "560035": { district: "Bengaluru Urban", state: "Karnataka", zone: "Southern", headPO: "Koramangala HO" },
  "560066": { district: "Bengaluru Urban", state: "Karnataka", zone: "Southern", headPO: "Hebbal HO" },
  "560100": { district: "Bengaluru Urban", state: "Karnataka", zone: "Southern", headPO: "Devanahalli HO" },
  // Hyderabad
  "500001": { district: "Hyderabad", state: "Telangana", zone: "Southern", headPO: "Hyderabad GPO" },
  "500029": { district: "Hyderabad", state: "Telangana", zone: "Southern", headPO: "Jubilee Hills HO" },
  "500034": { district: "Hyderabad", state: "Telangana", zone: "Southern", headPO: "Madhapur HO" },
  "500072": { district: "Ranga Reddy", state: "Telangana", zone: "Southern", headPO: "LB Nagar HO" },
  "500090": { district: "Ranga Reddy", state: "Telangana", zone: "Southern", headPO: "HITEC City HO" },
  // Chennai
  "600001": { district: "Chennai", state: "Tamil Nadu", zone: "Southern", headPO: "Chennai GPO" },
  "600018": { district: "Chennai", state: "Tamil Nadu", zone: "Southern", headPO: "T Nagar HO" },
  "600040": { district: "Chennai", state: "Tamil Nadu", zone: "Southern", headPO: "Tambaram HO" },
  "600058": { district: "Chennai", state: "Tamil Nadu", zone: "Southern", headPO: "Anna Nagar HO" },
  "600091": { district: "Chennai", state: "Tamil Nadu", zone: "Southern", headPO: "OMR HO" },
  // Kolkata
  "700001": { district: "Kolkata", state: "West Bengal", zone: "Eastern", headPO: "Kolkata GPO" },
  "700016": { district: "Kolkata", state: "West Bengal", zone: "Eastern", headPO: "Ballygunge HO" },
  "700029": { district: "Kolkata", state: "West Bengal", zone: "Eastern", headPO: "Jadavpur HO" },
  "700064": { district: "North 24 Parganas", state: "West Bengal", zone: "Eastern", headPO: "Dum Dum HO" },
  "700091": { district: "North 24 Parganas", state: "West Bengal", zone: "Eastern", headPO: "New Town HO" },
  // Pune
  "411001": { district: "Pune", state: "Maharashtra", zone: "Western", headPO: "Pune HO" },
  "411014": { district: "Pune", state: "Maharashtra", zone: "Western", headPO: "Hadapsar HO" },
  "411027": { district: "Pune", state: "Maharashtra", zone: "Western", headPO: "Baner HO" },
  "411036": { district: "Pune", state: "Maharashtra", zone: "Western", headPO: "Viman Nagar HO" },
  "411048": { district: "Pune", state: "Maharashtra", zone: "Western", headPO: "Hinjewadi HO" },
  // Ahmedabad
  "380001": { district: "Ahmedabad", state: "Gujarat", zone: "Western", headPO: "Ahmedabad GPO" },
  "380006": { district: "Ahmedabad", state: "Gujarat", zone: "Western", headPO: "Navrangpura HO" },
  "380013": { district: "Ahmedabad", state: "Gujarat", zone: "Western", headPO: "Satellite HO" },
  "380054": { district: "Ahmedabad", state: "Gujarat", zone: "Western", headPO: "Bopal HO" },
  "382001": { district: "Gandhinagar", state: "Gujarat", zone: "Western", headPO: "Gandhinagar HO" },
  // Surat
  "395001": { district: "Surat", state: "Gujarat", zone: "Western", headPO: "Surat HO" },
  "395002": { district: "Surat", state: "Gujarat", zone: "Western", headPO: "Citylight HO" },
  "395007": { district: "Surat", state: "Gujarat", zone: "Western", headPO: "Varachha HO" },
  // Jaipur
  "302001": { district: "Jaipur", state: "Rajasthan", zone: "Western", headPO: "Jaipur GPO" },
  "302012": { district: "Jaipur", state: "Rajasthan", zone: "Western", headPO: "Vaishali Nagar HO" },
  "302021": { district: "Jaipur", state: "Rajasthan", zone: "Western", headPO: "Sitapura HO" },
  // Lucknow
  "226001": { district: "Lucknow", state: "Uttar Pradesh", zone: "Northern", headPO: "Lucknow GPO" },
  "226010": { district: "Lucknow", state: "Uttar Pradesh", zone: "Northern", headPO: "Gomti Nagar HO" },
  "226016": { district: "Lucknow", state: "Uttar Pradesh", zone: "Northern", headPO: "Vikas Nagar HO" },
  // Vadodara
  "390001": { district: "Vadodara", state: "Gujarat", zone: "Western", headPO: "Vadodara HO" },
  "390003": { district: "Vadodara", state: "Gujarat", zone: "Western", headPO: "Akota HO" },
  "390007": { district: "Vadodara", state: "Gujarat", zone: "Western", headPO: "Alkapuri HO" },
  // Patna
  "800001": { district: "Patna", state: "Bihar", zone: "Eastern", headPO: "Patna GPO" },
  "800009": { district: "Patna", state: "Bihar", zone: "Eastern", headPO: "Boring Road HO" },
  // Chandigarh
  "160001": { district: "Chandigarh", state: "Chandigarh", zone: "Northern", headPO: "Chandigarh GPO" },
  "160017": { district: "Chandigarh", state: "Chandigarh", zone: "Northern", headPO: "Sector 17 HO" },
  // Kochi
  "682001": { district: "Ernakulam", state: "Kerala", zone: "Southern", headPO: "Ernakulam HO" },
  "682028": { district: "Ernakulam", state: "Kerala", zone: "Southern", headPO: "Infopark HO" },
  // Noida
  "201301": { district: "Gautam Buddha Nagar", state: "Uttar Pradesh", zone: "Northern", headPO: "Noida HO" },
  "201308": { district: "Gautam Buddha Nagar", state: "Uttar Pradesh", zone: "Northern", headPO: "Greater Noida HO" },
  // Gurugram
  "122001": { district: "Gurugram", state: "Haryana", zone: "Northern", headPO: "Gurugram HO" },
  "122018": { district: "Gurugram", state: "Haryana", zone: "Northern", headPO: "Manesar HO" },
};
