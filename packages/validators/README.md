# @bharat-ui/validators

Indian-context validators for PAN, Aadhaar, IFSC, Pincode and INR formatting.  
Zero dependencies. TypeScript-first. Works in React, React Native, and Node.js.

## Install

```bash
npm install @bharat-ui/validators
```

## Usage

```ts
import { validatePAN, validateAadhaar, validateIFSC, validatePincode, formatINR } from '@bharat-ui/validators';

validatePAN('ABCPE1234F');
// { valid: true, formatted: 'ABCPE1234F', meta: { type: 'Individual', typeCode: 'P' } }

validateAadhaar('2341 2341 2346');
// { valid: true, formatted: '2341 2341 2346', masked: 'XXXX XXXX 2346' }

validateIFSC('SBIN0001234');
// { valid: true, formatted: 'SBIN0001234', meta: { code: 'SBIN0001234', bank: 'State Bank of India', ... } }

validatePincode('390001');
// { valid: true, formatted: '390001', meta: { pincode: '390001', district: 'Vadodara', state: 'Gujarat', zone: 'Western', headPO: 'Vadodara HO' } }

formatINR(1234567);         // '₹12,34,567'
formatINRCompact(1234567);  // '₹12.35L'
```

## API

### `validatePAN(pan: string): PANResult`

Validates a Permanent Account Number. Infers taxpayer type from the 4th character.  
Case-insensitive — spaces stripped automatically.

```ts
interface PANResult {
  valid: boolean;
  formatted: string;   // 'ABCPE1234F' — empty string on failure
  error?: string;
  meta?: {
    type: string;      // 'Individual' | 'Company' | 'HUF' | 'Firm' | 'Trust' | ...
    typeCode: string;  // 'P' | 'C' | 'H' | 'F' | 'T' | ...
  };
}
```

### `validateAadhaar(aadhaar: string): AadhaarResult`

Validates a 12-digit Aadhaar number using the Verhoeff checksum algorithm.  
Spaces and hyphens stripped automatically.

```ts
interface AadhaarResult {
  valid: boolean;
  formatted: string;  // '2341 2341 2346' — empty string on failure
  masked?: string;    // 'XXXX XXXX 2346' — only present on valid input
  error?: string;
}
```

### `validateIFSC(ifsc: string): IFSCResult`

Validates an 11-character IFSC code against the bundled RBI dataset.  
Returns full bank and branch metadata — no network calls.

```ts
interface IFSCResult {
  valid: boolean;
  formatted: string;  // 'SBIN0001234' — empty string on failure
  error?: string;
  meta?: {
    code: string;
    bank: string;
    branch: string;
    address: string;
    city: string;
    state: string;
    contact: string;
  };
}
```

### `validatePincode(pincode: string): PincodeResult`

Validates a 6-digit Indian pincode against the bundled India Post dataset.  
Returns district, state, zone and head post office — no network calls.

```ts
interface PincodeResult {
  valid: boolean;
  formatted: string;  // '390001' — empty string on failure
  error?: string;
  meta?: {
    pincode: string;
    district: string;
    state: string;
    zone: string;
    headPO: string;
  };
}
```

### `formatINR(amount: number): string`

Formats a number using the Indian numbering system (lakhs, crores) with the ₹ symbol.

```ts
formatINR(1234567)    // '₹12,34,567'
formatINR(100)        // '₹100'
```

### `formatINRCompact(amount: number): string`

Compact Indian number formatting with L (lakh) and Cr (crore) suffixes.

```ts
formatINRCompact(1234567)    // '₹12.35L'
formatINRCompact(12345678)   // '₹1.23Cr'
formatINRCompact(999)        // '₹999'
```

### `parseINR(formatted: string): number`

Strips ₹ symbol and commas, returns the raw number.

```ts
parseINR('₹12,34,567')  // 1234567
```

## License

MIT
