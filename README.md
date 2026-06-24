# Bharat UI

**The missing UI layer for Indian products.**

PAN, Aadhaar, IFSC, UPI, OTP and ₹ formatting — built once, tested, typed, open source. Stop rebuilding the same validators in every project.

[![npm](https://img.shields.io/npm/v/@bharat-ui/validators.svg?label=%40bharat-ui%2Fvalidators&color=orange)](https://www.npmjs.com/package/@bharat-ui/validators)
[![npm](https://img.shields.io/npm/v/@bharat-ui/data.svg?label=%40bharat-ui%2Fdata&color=orange)](https://www.npmjs.com/package/@bharat-ui/data)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## Packages

| Package | Version | Description |
|---|---|---|
| [`@bharat-ui/validators`](./packages/validators) | `0.1.0` | Zero-dep validators for PAN, Aadhaar, IFSC, Pincode and INR formatting |
| [`@bharat-ui/react`](./packages/ui) | `0.1.0` | React components built on top of the validators |
| [`@bharat-ui/data`](./packages/data) | `0.1.0` | Bundled RBI IFSC dataset and India Post pincode dataset |

---

## Quick start

```bash
npm install @bharat-ui/validators
```

```ts
import { validatePAN, validateIFSC, formatINR, formatINRCompact } from '@bharat-ui/validators';

validatePAN('ABCPE1234F');
// { valid: true, formatted: 'ABCPE1234F', meta: { type: 'Individual', typeCode: 'P' } }

validateIFSC('SBIN0001234');
// { valid: true, formatted: 'SBIN0001234', meta: { code: 'SBIN0001234', bank: 'State Bank of India', ... } }

formatINR(1234567);         // '₹12,34,567'
formatINRCompact(1234567);  // '₹12.35L'
```

For React components:

```bash
npm install @bharat-ui/react
```

```tsx
import { PANInput } from '@bharat-ui/react/PANInput';
import { AmountInput } from '@bharat-ui/react/AmountInput';

function MyForm() {
  const [pan, setPan] = React.useState('');
  const [amount, setAmount] = React.useState<number>();

  return (
    <>
      <PANInput label="PAN number" value={pan} onChange={(v) => setPan(v)} />
      <AmountInput label="Loan amount" value={amount} onChange={(raw) => setAmount(raw)} />
    </>
  );
}
```

---

## `@bharat-ui/validators`

Zero dependencies. TypeScript-first. Works in React, React Native and Node.js.

### Functions

| Function | Description |
|---|---|
| `validatePAN(pan)` | PAN format + taxpayer type inference |
| `validateAadhaar(aadhaar)` | 12-digit Verhoeff checksum + masked output |
| `validateIFSC(ifsc)` | Format check + bundled RBI dataset |
| `validatePincode(pincode)` | 6-digit check + bundled India Post dataset |
| `formatINR(amount)` | Indian comma notation with ₹ symbol |
| `formatINRCompact(amount)` | Lakh / crore compact notation |
| `parseINR(formatted)` | Strip ₹ and commas, return raw number |

### Return shapes

Every validator returns a consistent shape: `{ valid, formatted, error?, meta? }`.

```ts
// validatePAN
{ valid: boolean; formatted: string; error?: string; meta?: { type: string; typeCode: string } }

// validateAadhaar
{ valid: boolean; formatted: string; masked?: string; error?: string }

// validateIFSC
{
  valid: boolean; formatted: string; error?: string;
  meta?: { code: string; bank: string; branch: string; address: string; city: string; state: string; contact: string }
}

// validatePincode
{
  valid: boolean; formatted: string; error?: string;
  meta?: { pincode: string; district: string; state: string; zone: string; headPO: string }
}

// formatINR(1234567)        → '₹12,34,567'
// formatINRCompact(1234567) → '₹12.35L'
// parseINR('₹12,34,567')   → 1234567
```

---

## `@bharat-ui/react`

React components that wire up the validators, handle formatting, and manage input state. Requires React 19.

| Component | Description |
|---|---|
| `<AmountInput />` | ₹ input with live Indian number formatting |
| `<OTPInput />` | Box-per-digit OTP entry with auto-advance and resend timer |
| `<PANInput />` | Auto-uppercase PAN entry with taxpayer type badge |
| `<PincodeInput />` | Pincode entry with live district/state lookup |
| `<UPIButton />` | UPI deep-link payment buttons (GPay, PhonePe, Paytm, BHIM) |

Import each component from its own subpath:

```ts
import { AmountInput }  from '@bharat-ui/react/AmountInput';
import { OTPInput }     from '@bharat-ui/react/OTPInput';
import { PANInput }     from '@bharat-ui/react/PANInput';
import { PincodeInput } from '@bharat-ui/react/PincodeInput';
import { UPIButton }    from '@bharat-ui/react/UPIButton';
```

### Key props

**`<AmountInput />`** — `value: number | undefined`, `onChange: (raw: number, formatted: string) => void`

**`<OTPInput />`** — `length: 4 | 6`, `onComplete: (otp: string) => void`, `resendAfterSeconds: number`

**`<PANInput />`** — `value: string`, `onChange: (value: string, valid: boolean) => void`, `showTypeBadge: boolean`

**`<PincodeInput />`** — `value: string`, `onChange: (value: string, valid: boolean) => void`, `showCascade: boolean`

**`<UPIButton />`** — `vpa: string`, `amount: number`, `merchantName: string`, `transactionNote?: string`

---

## Why Bharat UI

- **Indian number system** — ₹12,34,567 not ₹1,234,567. Lakh and crore notation built in.
- **Zero network calls** — IFSC and pincode datasets are bundled. Instant lookup, works offline.
- **Verified checksums** — Aadhaar uses the Verhoeff algorithm. PAN infers taxpayer type from the 4th character.
- **Consistent API** — every validator returns `{ valid, formatted, error?, meta? }`. Learn once, use everywhere.
- **TypeScript-first** — full types for every input and return shape.
- **Tree-shakeable** — import only what you need. `@bharat-ui/validators` has zero runtime dependencies.

---

## Monorepo structure

```
bharat-ui/
├── apps/
│   └── docs/          # Next.js docs site and landing page
├── packages/
│   ├── validators/    # @bharat-ui/validators
│   ├── ui/            # @bharat-ui/react
│   └── data/          # @bharat-ui/data (IFSC + Pincode datasets)
```

## Development

```bash
# Install dependencies
bun install

# Start dev server
bun run dev

# Build all packages
bun run build

# Run validator tests
cd packages/validators && bun test
```

---

MIT © Bharat UI contributors
