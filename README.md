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
| [`@bharat-ui/validators`](./packages/validators) | `0.1.5` | Zero-dep format validators for PAN, Aadhaar, IFSC, Pincode and INR |
| [`@bharat-ui/react`](./packages/ui) | `0.1.5` | React components with resolver-based IFSC and Pincode lookup |
| [`@bharat-ui/data`](./packages/data) | `0.1.4` | Optional bundled popular dataset for offline IFSC and Pincode lookup |

---

## Quick start

```bash
npm install @bharat-ui/validators
```

```ts
import { validatePAN, validateAadhaar, validateIFSC, validatePincode, formatINR } from '@bharat-ui/validators';

validatePAN('ABCPE1234F');
// { valid: true, formatted: 'ABCPE1234F', meta: { type: 'Individual', typeCode: 'P' } }

validateAadhaar('234123412346');
// { valid: true, formatted: '2341 2341 2346', masked: 'XXXX XXXX 2346' }

validateIFSC('SBIN0001234');
// { valid: true, formatted: 'SBIN0001234' }
// → for bank/branch metadata, use a resolver (see below)

validatePincode('390001');
// { valid: true, formatted: '390001' }
// → for district/state metadata, use a resolver (see below)

formatINR(1234567);          // '₹12,34,567'
formatINRCompact(1234567);   // '₹12.35L'
```

For React components:

```bash
npm install @bharat-ui/react
```

```tsx
import { PANInput }     from '@bharat-ui/react/PANInput';
import { PincodeInput } from '@bharat-ui/react/PincodeInput';
import { IFSCInput }    from '@bharat-ui/react/IFSCInput';
import { AmountInput }  from '@bharat-ui/react/AmountInput';
import { bundledPincodeResolver, bundledIFSCResolver } from '@bharat-ui/react/resolvers';

function MyForm() {
  const [pan, setPan] = React.useState('');
  const [pincode, setPincode] = React.useState('');
  const [ifsc, setIfsc] = React.useState('');
  const [amount, setAmount] = React.useState<number>();

  return (
    <>
      <PANInput label="PAN number" value={pan} onChange={(v) => setPan(v)} />

      {/* bundled popular dataset — ~8KB, opt-in */}
      <PincodeInput label="Pincode" value={pincode} onChange={(v) => setPincode(v)} resolver={bundledPincodeResolver} />

      {/* or your own API — zero bundle cost */}
      <IFSCInput label="IFSC" value={ifsc} onChange={(v) => setIfsc(v)} resolver={async (code) => fetch(`/api/ifsc/${code}`).then(r => r.json())} />

      <AmountInput label="Loan amount" value={amount} onChange={(raw) => setAmount(raw)} />
    </>
  );
}
```

---

## `@bharat-ui/validators`

Zero dependencies. ~4KB packed. TypeScript-first. Works in React, React Native and Node.js.

All validators are **pure format checks** — no dataset bundled, no network calls. For metadata (bank name, district, state) use the resolver pattern on the React components.

### Functions

| Function | Description |
|---|---|
| `validatePAN(pan)` | PAN format + taxpayer type inference from the 4th character |
| `validateAadhaar(aadhaar)` | 12-digit Verhoeff checksum + masked output |
| `validateIFSC(ifsc)` | IFSC format check (4 letters + 0 + 6 alphanumeric) |
| `validatePincode(pincode)` | 6-digit check, must not start with 0 |
| `formatINR(amount)` | Indian comma notation with ₹ symbol |
| `formatINRCompact(amount)` | Lakh / crore compact notation |
| `parseINR(formatted)` | Strip ₹ and commas, return raw number |

### Return shapes

```ts
// validatePAN
{ valid: boolean; formatted: string; error?: string; meta?: { type: string; typeCode: string } }

// validateAadhaar
{ valid: boolean; formatted: string; masked?: string; error?: string }

// validateIFSC — format only, no meta
{ valid: boolean; formatted: string; error?: string }

// validatePincode — format only, no meta
{ valid: boolean; formatted: string; error?: string }

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
| `<PincodeInput />` | Pincode entry — pass a `resolver` for district/state cascade |
| `<IFSCInput />` | IFSC entry — pass a `resolver` for bank/branch details |
| `<UPIButton />` | UPI deep-link payment buttons (GPay, PhonePe, Paytm, BHIM) |

Import each component from its own subpath:

```ts
import { AmountInput }  from '@bharat-ui/react/AmountInput';
import { OTPInput }     from '@bharat-ui/react/OTPInput';
import { PANInput }     from '@bharat-ui/react/PANInput';
import { PincodeInput } from '@bharat-ui/react/PincodeInput';
import { IFSCInput }    from '@bharat-ui/react/IFSCInput';
import { UPIButton }    from '@bharat-ui/react/UPIButton';
```

### Key props

**`<AmountInput />`** — `value: number | undefined`, `onChange: (raw: number, formatted: string) => void`

**`<OTPInput />`** — `length: 4 | 6`, `onComplete: (otp: string) => void`, `resendAfterSeconds: number`

**`<PANInput />`** — `value: string`, `onChange: (value: string, valid: boolean) => void`, `showTypeBadge?: boolean`

**`<PincodeInput />`** — `value: string`, `onChange: (value: string, valid: boolean) => void`, `resolver?: PincodeResolver`, `showCascade?: boolean`

**`<IFSCInput />`** — `value: string`, `onChange: (value: string, valid: boolean) => void`, `resolver?: IFSCResolver`, `showDetails?: boolean`

**`<UPIButton />`** — `vpa: string`, `amount: number`, `merchantName: string`, `transactionNote?: string`

---

## Resolvers

`PincodeInput` and `IFSCInput` accept a `resolver` prop — an async function that returns metadata from wherever you choose.

```ts
import { bundledPincodeResolver, bundledIFSCResolver } from '@bharat-ui/react/resolvers';

// Option 1 — bundled popular dataset (~8KB, covers major metros, opt-in)
<PincodeInput resolver={bundledPincodeResolver} />
<IFSCInput    resolver={bundledIFSCResolver} />

// Option 2 — your own API (full coverage, zero extra bundle cost)
<PincodeInput resolver={async (pin)  => fetch(`/api/pincode/${pin}`).then(r => r.json())} />
<IFSCInput    resolver={async (ifsc) => fetch(`/api/ifsc/${ifsc}`).then(r => r.json())} />

// Option 3 — no resolver (format validation only, no cascade shown)
<PincodeInput />
```

### Resolver types

```ts
type PincodeResolver = (pincode: string) => Promise<PincodeData | null>
type IFSCResolver    = (ifsc: string)    => Promise<IFSCData | null>

interface PincodeData {
  state: string
  zone?: string
  district?: string
  headPO?: string
}

interface IFSCData {
  bank: string
  branch?: string
  city?: string
  state?: string
  address?: string
  contact?: string
}
```

> **Bundle size:** importing `bundledPincodeResolver` or `bundledIFSCResolver` adds ~8KB (the popular dataset). If you use your own API resolver, `@bharat-ui/data` never enters your bundle.

---

## Why Bharat UI

- **Indian number system** — ₹12,34,567 not ₹1,234,567. Lakh and crore notation built in.
- **Resolver pattern** — IFSC and Pincode validators are pure format checks. Opt in to the bundled dataset (~8KB) or plug in your own API. You decide what enters your bundle.
- **Verified checksums** — Aadhaar uses the full Verhoeff algorithm. PAN infers taxpayer type from the 4th character.
- **Consistent API** — every validator returns `{ valid, formatted, error?, meta? }`. Learn once, use everywhere.
- **TypeScript-first** — full types for every input, return shape, and resolver interface.
- **Tree-shakeable** — `@bharat-ui/validators` is ~4KB with zero runtime dependencies.

---

## Monorepo structure

```
bharat-ui/
├── apps/
│   └── docs/          # Next.js docs site and landing page
├── packages/
│   ├── validators/    # @bharat-ui/validators
│   ├── ui/            # @bharat-ui/react
│   └── data/          # @bharat-ui/data (optional popular dataset)
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
