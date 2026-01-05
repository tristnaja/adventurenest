# Stripe Payment Integration & Bank Account Setup Guide

This guide will walk you through integrating Stripe payment processing into AdventureNest and setting up your bank account to receive money.

---

## IMPORTANT: Current Status

Currently, the checkout flow is in **DEMO MODE**:
- ❌ No real payments are processed
- ❌ No money is charged
- ❌ Cart is cleared after "demo" checkout
- ❌ No payment records are created

This guide will show you how to enable **real payment processing** and receive money in your bank account.

---

## Part 1: Create Your Stripe Account

### Step 1: Sign Up for Stripe

1. Go to [https://stripe.com](https://stripe.com)
2. Click **"Start now"** or **"Sign up"**
3. Fill in your information:
   - Email address
   - Full name
   - Country (this is important - determines currency and bank requirements)
   - Password
4. Verify your email address (check inbox for confirmation link)
5. Log in to your Stripe Dashboard

### Step 2: Activate Your Account

1. In the Stripe Dashboard, you'll see a banner to **"Activate your account"**
2. Click on it and provide:
   - **Business details:**
     - Business type (Individual, Company, or Non-profit)
     - Business name (can be your name if individual)
     - Industry: Recreation / Travel & Hospitality
     - Business website (optional for testing)
   - **Personal information:**
     - Legal name
     - Date of birth
     - Phone number
     - Address
   - **Bank account information** (see Step 3 below)
   - **Identity verification:**
     - Last 4 digits of SSN (US) or equivalent
     - May require photo ID upload

3. Click **"Submit"** when complete
4. Stripe will review your information (can take a few hours to a few days)

### Step 3: Connect Your Bank Account

This is where you'll receive your money.

1. In Stripe Dashboard, go to **"Settings"** (top right gear icon)
2. Navigate to **"Payouts"** in the left sidebar under "Payments"
3. Click **"Add bank account"**
4. Choose your country
5. Enter your bank details:
   - **US:** Routing number and Account number
   - **UK:** Sort code and Account number
   - **EU:** IBAN
   - **Other:** Varies by country
6. Stripe will verify your bank (may send micro-deposits or use instant verification)
7. Once verified, you'll see your bank account listed

**Payout Schedule:**
- Default: Automatic payouts every 2 business days
- You can change this in Settings → Payouts
- First payout may take 7-14 days (Stripe's rolling reserve period)

---

## Part 2: Get Your API Keys

### Step 1: Access API Keys

1. In Stripe Dashboard, go to **"Developers"** (top right)
2. Click on **"API keys"** in the left sidebar
3. You'll see two types of keys:
   - **Test mode** (for development)
   - **Live mode** (for production)

### Step 2: Copy Test Keys (For Development)

Make sure you're in **"Test mode"** (toggle at top):

1. **Publishable key** (starts with `pk_test_`):
   - Visible by default
   - Copy this value
   - This is safe to expose in frontend code

2. **Secret key** (starts with `sk_test_`):
   - Click **"Reveal test key"**
   - Copy this value
   - **NEVER expose this in frontend code or commit to Git**

### Step 3: Update Your .env File

Add these new environment variables to your `.env` file:

```bash
# Stripe Test Keys (for development)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_51AbCdEfGhIjKlMnOpQrStUvWxYz1234567890AbCdEfGhIjKlMnOpQrStUvWxYz"
STRIPE_SECRET_KEY="sk_test_51AbCdEfGhIjKlMnOpQrStUvWxYz1234567890AbCdEfGhIjKlMnOpQrStUvWxYz1234567890AbCdEfGhIjKlMnOp"

# Stripe Webhook Secret (you'll get this in Part 4)
STRIPE_WEBHOOK_SECRET="whsec_1234567890abcdefghijklmnopqrstuvwxyz"
```

**Note:** The `NEXT_PUBLIC_` prefix makes it available in the browser. Only use this for the publishable key.

---

## Part 3: Install Stripe SDK and Integrate Code

### Step 1: Install Required Packages

Stop your dev server and run:

```bash
npm install @stripe/stripe-js stripe
```

### Step 2: Create Stripe Utilities

Create `src/lib/stripe.ts`:

```typescript
import Stripe from 'stripe';

// Server-side Stripe instance
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia',
  typescript: true,
});

// Client-side Stripe Promise
import { loadStripe } from '@stripe/stripe-js';

export const getStripePromise = () => {
  return loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
};
```

### Step 3: Create Checkout Server Action

Create `src/app/checkout/actions.ts`:

```typescript
'use server';

import { stripe } from '@/lib/stripe';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export async function createCheckoutSession(cartItems: Array<{
  id: string;
  name: string;
  price: number;
  quantity: number;
}>) {
  const session = await auth();

  if (!session?.user?.email) {
    throw new Error('You must be signed in to checkout');
  }

  // Create line items for Stripe
  const lineItems = cartItems.map(item => ({
    price_data: {
      currency: 'usd',
      product_data: {
        name: item.name,
      },
      unit_amount: Math.round(item.price * 100), // Convert to cents
    },
    quantity: item.quantity,
  }));

  // Create Stripe Checkout Session
  const checkoutSession = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    line_items: lineItems,
    customer_email: session.user.email,
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cart`,
    metadata: {
      userId: session.user.email,
    },
  });

  // Redirect to Stripe Checkout
  redirect(checkoutSession.url!);
}
```

### Step 4: Update Checkout Page

Replace the content of `src/app/checkout/page.tsx` with:

```typescript
'use client';

import { useCart } from '@/contexts/CartContext';
import { createCheckoutSession } from './actions';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (items.length === 0) {
      router.push('/cart');
    }
  }, [items, router]);

  const handleCheckout = async () => {
    try {
      setIsLoading(true);
      await createCheckoutSession(items);
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Failed to create checkout session. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Order Summary */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between border-b pb-4">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                  <p className="font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Payment Section */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
            <h2 className="text-xl font-semibold mb-4">Payment</h2>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span>$10.00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tax</span>
                <span>${(total * 0.08).toFixed(2)}</span>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${(total + 10 + total * 0.08).toFixed(2)}</span>
                </div>
              </div>
              <Button
                onClick={handleCheckout}
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? 'Processing...' : 'Proceed to Payment'}
              </Button>
              <p className="text-xs text-gray-500 text-center">
                You will be redirected to Stripe to complete your payment securely
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

### Step 5: Create Success Page

Create `src/app/checkout/success/page.tsx`:

```typescript
'use client';

import { useEffect } from 'react';
import { useCart } from '@/contexts/CartContext';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function CheckoutSuccessPage() {
  const { clearCart } = useCart();
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (sessionId) {
      // Clear the cart after successful payment
      clearCart();
    } else {
      // No session ID means they didn't complete checkout
      router.push('/cart');
    }
  }, [sessionId, clearCart, router]);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto text-center">
        <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
          <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
        <p className="text-gray-600 mb-8">
          Thank you for your purchase. You will receive a confirmation email shortly.
        </p>
        <div className="space-y-4">
          <Link href="/shop">
            <Button className="w-full">Continue Shopping</Button>
          </Link>
          <Link href="/account/orders">
            <Button variant="outline" className="w-full">View Orders</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
```

### Step 6: Add APP_URL to .env

Add this to your `.env`:

```bash
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

For production, change this to your actual domain (e.g., `https://yourdomain.com`)

---

## Part 4: Set Up Webhooks (Important!)

Webhooks notify your app when payments succeed or fail. This is crucial for creating order records.

### Step 1: Install Stripe CLI (For Local Testing)

1. Download Stripe CLI:
   - **Mac:** `brew install stripe/stripe-cli/stripe`
   - **Windows/Linux:** Download from [https://stripe.com/docs/stripe-cli](https://stripe.com/docs/stripe-cli)

2. Authenticate:
   ```bash
   stripe login
   ```
   This opens your browser to authenticate.

### Step 2: Create Webhook Endpoint

Create `src/app/api/webhooks/stripe/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { prisma } from '@/lib/db';
import Stripe from 'stripe';

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;

      // Create payment record in database
      await prisma.payment.create({
        data: {
          amount: session.amount_total! / 100, // Convert from cents
          currency: session.currency!,
          status: 'COMPLETED',
          stripePaymentId: session.id,
          stripePaymentIntentId: session.payment_intent as string,
          user: {
            connect: { email: session.customer_email! },
          },
        },
      });

      // TODO: Create order record, update product stock, send confirmation email
      console.log('Payment successful:', session.id);
      break;
    }

    case 'checkout.session.expired': {
      const session = event.data.object as Stripe.Checkout.Session;
      console.log('Checkout session expired:', session.id);
      break;
    }

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
```

### Step 3: Test Webhook Locally

1. Start your dev server:
   ```bash
   npm run dev
   ```

2. In a separate terminal, run:
   ```bash
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```

3. This will output a webhook signing secret like:
   ```
   whsec_1234567890abcdefghijklmnopqrstuvwxyz
   ```

4. Copy this and add it to your `.env`:
   ```bash
   STRIPE_WEBHOOK_SECRET="whsec_1234567890abcdefghijklmnopqrstuvwxyz"
   ```

5. Restart your dev server

### Step 4: Configure Production Webhooks

When deploying to production:

1. Go to Stripe Dashboard → **Developers** → **Webhooks**
2. Click **"Add endpoint"**
3. Enter your endpoint URL:
   ```
   https://yourdomain.com/api/webhooks/stripe
   ```
4. Select events to listen to:
   - `checkout.session.completed`
   - `checkout.session.expired`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
5. Click **"Add endpoint"**
6. Copy the **Signing secret** and add it to your production environment variables

---

## Part 5: Update Database Schema for Orders

Your current schema has a `Payment` model but no `Order` model. Add this to `prisma/schema.prisma`:

```prisma
model Order {
  id        String   @id @default(cuid())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  items     OrderItem[]

  totalAmount Decimal  @db.Decimal(10, 2)
  status      String   @default("PENDING") // PENDING, PROCESSING, SHIPPED, DELIVERED, CANCELLED

  paymentId String?  @unique
  payment   Payment? @relation(fields: [paymentId], references: [id])

  shippingAddress Json // Store address as JSON

  @@index([userId])
  @@index([status])
}

model OrderItem {
  id        String   @id @default(cuid())

  orderId   String
  order     Order    @relation(fields: [orderId], references: [id], onDelete: Cascade)

  productId String
  product   Product  @relation(fields: [productId], references: [id])

  quantity  Int
  price     Decimal  @db.Decimal(10, 2) // Price at time of purchase

  @@index([orderId])
  @@index([productId])
}
```

Update the `User` model to include orders:
```prisma
model User {
  // ... existing fields ...
  orders    Order[]
}
```

Update the `Product` model:
```prisma
model Product {
  // ... existing fields ...
  orderItems OrderItem[]
}
```

Update the `Payment` model:
```prisma
model Payment {
  // ... existing fields ...
  order     Order?
}
```

Then run:
```bash
npx prisma migrate dev --name add-orders
npx prisma generate
```

---

## Part 6: Test Payments

### Test with Stripe Test Cards

Stripe provides test card numbers:

**Successful Payment:**
- Card: `4242 4242 4242 4242`
- Expiry: Any future date (e.g., 12/34)
- CVC: Any 3 digits (e.g., 123)
- ZIP: Any 5 digits (e.g., 12345)

**Declined Payment:**
- Card: `4000 0000 0000 0002`

**More test cards:** [https://stripe.com/docs/testing](https://stripe.com/docs/testing)

### Testing Flow:

1. Browse to `/shop`
2. Add products to cart
3. Go to `/cart`
4. Click "Checkout"
5. You'll be redirected to Stripe's checkout page
6. Enter test card details
7. Complete payment
8. You'll be redirected back to your success page
9. Check Stripe Dashboard → Payments to see the transaction
10. Check your terminal running `stripe listen` to see webhook events
11. Check database (Prisma Studio) to see payment record

---

## Part 7: Where Does the Money Go?

### Flow of Money:

1. **Customer pays** → Stripe Checkout processes the payment
2. **Stripe holds funds** → Money goes into your Stripe balance
3. **Payout schedule triggers** → Stripe automatically transfers to your bank
4. **Money arrives in your bank account** → Usually 2 business days

### View Your Balance:

1. Go to Stripe Dashboard → **Balance**
2. See:
   - **Available balance:** Ready to be paid out
   - **Pending balance:** Waiting for processing
   - **Payouts:** History of transfers to your bank

### Payout Settings:

1. Go to **Settings** → **Payouts**
2. Configure:
   - **Automatic payouts:** Daily, weekly, monthly, or manual
   - **Payout speed:** Standard (2 days) or Instant (for a fee)
   - **Minimum payout amount:** Default is $1

### First Payout:

- **Rolling reserve:** Stripe holds your first payout for 7-14 days
- This is standard fraud prevention
- After initial period, payouts become regular (every 2 days by default)

### Fees:

Stripe charges per transaction:
- **US:** 2.9% + $0.30 per successful card charge
- **International:** Varies by country
- Example: $100 sale = $97.10 in your account ($2.90 fee)

### Viewing Money in Dashboard:

1. **Balance** → See what you've earned
2. **Payments** → See individual transactions
3. **Payouts** → See bank transfers
4. **Reports** → Download financial reports for accounting

---

## Part 8: Go Live (Production)

### Step 1: Complete Account Activation

Make sure you've submitted all required information in Stripe Dashboard:
- Business details verified
- Bank account connected and verified
- Identity verification completed
- Tax information provided (if required)

### Step 2: Get Live API Keys

1. In Stripe Dashboard, toggle from **Test mode** to **Live mode**
2. Go to **Developers** → **API keys**
3. Copy your **live** keys:
   - Publishable key (starts with `pk_live_`)
   - Secret key (starts with `sk_live_`)
4. Update your **production** environment variables (Vercel, etc.):
   ```bash
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_..."
   STRIPE_SECRET_KEY="sk_live_..."
   NEXT_PUBLIC_APP_URL="https://yourdomain.com"
   ```

### Step 3: Configure Production Webhooks

See Part 4, Step 4 above

### Step 4: Test in Production

1. Make a real small purchase (e.g., $1)
2. Use your real card
3. Check Stripe Dashboard (Live mode) for the payment
4. Wait for payout to arrive in your bank (2-7 days for first one)

---

## Security Checklist

- ✅ Never expose `STRIPE_SECRET_KEY` in frontend code
- ✅ Never commit API keys to Git (use .env and .gitignore)
- ✅ Always validate webhook signatures
- ✅ Use HTTPS in production (required by Stripe)
- ✅ Validate amounts on server-side (never trust client)
- ✅ Implement rate limiting on checkout endpoints
- ✅ Log all payment events for audit trail
- ✅ Handle errors gracefully (don't expose stack traces to users)

---

## Tax and Legal Considerations

- **Sales Tax:** Stripe Tax can automatically calculate taxes (paid feature)
- **1099-K Forms:** Stripe reports to IRS if you process >$5000 (US)
- **Business Registration:** Check if your state/country requires business registration
- **Terms of Service:** Add privacy policy and terms to your site
- **PCI Compliance:** Stripe handles this, but review their requirements

---

## Troubleshooting

### "No such customer" error
**Solution:** Make sure user is signed in before checkout

### Webhook not receiving events
**Solution:**
- Check webhook URL is publicly accessible
- Verify webhook secret matches .env
- Check Stripe Dashboard → Webhooks for failed deliveries

### Payment succeeds but no order created
**Solution:**
- Check webhook logs in Stripe Dashboard
- Verify your webhook handler is working
- Check database connection in webhook endpoint

### Bank account verification pending
**Solution:**
- Wait for Stripe to send micro-deposits (1-2 days)
- Or use instant verification with bank login

---

## What This Enables

Once Stripe is integrated:
- ✅ Real credit card payments
- ✅ Money deposited to your bank account
- ✅ Automatic receipt emails from Stripe
- ✅ Customer payment history
- ✅ Refund capabilities
- ✅ Dispute management
- ✅ Financial reporting

---

## Resources

- **Stripe Documentation:** https://stripe.com/docs
- **Next.js + Stripe Guide:** https://stripe.com/docs/payments/checkout/how-checkout-works
- **Test Cards:** https://stripe.com/docs/testing
- **Webhooks Guide:** https://stripe.com/docs/webhooks
- **Stripe Dashboard:** https://dashboard.stripe.com
- **Stripe Support:** Available 24/7 in dashboard chat

---

**Ready to Accept Payments?** Follow these steps in order, test thoroughly in test mode, then go live when ready!
