# @bharat-ui/react

React components for Indian products — PAN input, Aadhaar OTP, UPI payments, pincode lookup and ₹ amount entry.  
Built on top of [`@bharat-ui/validators`](https://npmjs.com/package/@bharat-ui/validators). Requires React 19.

## Install

```bash
npm install @bharat-ui/react
```

## Components

Import each component from its own subpath:

```ts
import { AmountInput }  from '@bharat-ui/react/AmountInput';
import { OTPInput }     from '@bharat-ui/react/OTPInput';
import { PANInput }     from '@bharat-ui/react/PANInput';
import { PincodeInput } from '@bharat-ui/react/PincodeInput';
import { UPIButton }    from '@bharat-ui/react/UPIButton';
```

---

### `<AmountInput />`

Currency input with live INR formatting. Displays ₹ formatted output while storing the raw number internally.

```tsx
<AmountInput
  label="Loan amount"
  value={amount}
  onChange={(raw, formatted) => setAmount(raw)}
/>
```

| Prop | Type | Default |
|---|---|---|
| `value` | `number \| undefined` | — |
| `onChange` | `(raw: number, formatted: string) => void` | — |
| `label` | `string` | — |
| `placeholder` | `string` | `'0'` |
| `error` | `string` | — |
| `disabled` | `boolean` | `false` |
| `showCompact` | `boolean` | `true` |

---

### `<OTPInput />`

Individual-box OTP entry with auto-advance, backspace handling, paste support and a built-in resend countdown timer.

```tsx
<OTPInput
  label="Enter OTP sent to +91 98765 43210"
  length={6}
  resendAfterSeconds={30}
  onComplete={(otp) => verifyOTP(otp)}
  onResend={() => requestNewOTP()}
/>
```

| Prop | Type | Default |
|---|---|---|
| `length` | `4 \| 6` | `6` |
| `label` | `string` | — |
| `onComplete` | `(otp: string) => void` | — |
| `onChange` | `(otp: string) => void` | — |
| `resendAfterSeconds` | `number` | `30` |
| `onResend` | `() => void` | — |
| `error` | `string` | — |
| `disabled` | `boolean` | `false` |

---

### `<PANInput />`

Text input that auto-uppercases, validates PAN format on each keystroke, and shows the taxpayer type badge on valid input.

```tsx
<PANInput
  label="PAN number"
  value={pan}
  onChange={(value, valid) => setPan(value)}
/>
```

| Prop | Type | Default |
|---|---|---|
| `value` | `string` | `''` |
| `onChange` | `(value: string, valid: boolean) => void` | — |
| `label` | `string` | — |
| `error` | `string` | — |
| `disabled` | `boolean` | `false` |
| `showTypeBadge` | `boolean` | `true` |

---

### `<PincodeInput />`

Numeric input that looks up the 6-digit pincode in the India Post dataset and shows the resolved district and state on valid input — no network calls.

```tsx
<PincodeInput
  label="Pincode"
  value={pincode}
  onChange={(value, valid) => setPincode(value)}
/>
```

| Prop | Type | Default |
|---|---|---|
| `value` | `string` | `''` |
| `onChange` | `(value: string, valid: boolean) => void` | — |
| `label` | `string` | — |
| `error` | `string` | — |
| `disabled` | `boolean` | `false` |
| `showCascade` | `boolean` | `true` |

---

### `<UPIButton />`

Renders a row of UPI app buttons (GPay, PhonePe, Paytm, BHIM) that each generate a deep-link payment URI. No SDK or backend required.

```tsx
<UPIButton
  vpa="merchant@okaxis"
  amount={499}
  merchantName="Acme Store"
  transactionNote="Order #1234"
/>
```

| Prop | Type | Default |
|---|---|---|
| `vpa` | `string` | — |
| `amount` | `number` | — |
| `merchantName` | `string` | — |
| `transactionNote` | `string` | — |
| `currency` | `string` | `'INR'` |
| `onSuccess` | `() => void` | — |
| `onError` | `(error: string) => void` | — |

---

## Peer dependencies

```json
{
  "react": "^19.0.0",
  "react-dom": "^19.0.0"
}
```

## License

MIT
