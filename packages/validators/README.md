# @bharat-ui/validators

Indian-context validators for PAN, Aadhaar, IFSC, Pincode and INR formatting.
Zero dependencies. TypeScript-first. Works in React, React Native, and Node.js.

## Install

\`\`\`bash
npm install @bharat-ui/validators @bharat-ui/data
\`\`\`

## Usage

\`\`\`ts
import { validatePAN, validateAadhaar, formatINR } from '@bharat-ui/validators';

validatePAN('ABCPE1234F');
// { valid: true, formatted: 'ABCPE1234F', meta: { type: 'Individual', typeCode: 'P' } }

validateAadhaar('2341 2341 2346');
// { valid: true, formatted: '2341 2341 2346', masked: 'XXXX XXXX 2346' }

formatINR(1234567);
// '₹12,34,567'
\`\`\`

## Validators

| Function | Description |
|---|---|
| `validatePAN` | PAN format + taxpayer type inference |
| `validateAadhaar` | 12-digit + Verhoeff checksum + masking |
| `validateIFSC` | Format + RBI dataset lookup |
| `validatePincode` | 6-digit + India Post dataset lookup |
| `formatINR` | Indian comma formatting with ₹ |
| `formatINRCompact` | Lakh/crore compact notation |
| `parseINR` | Strip ₹ and commas to number |
