# LegalConnect - Razorpay TEST MODE Payment Integration Guide

This guide documents the end-to-end Razorpay sandbox payment integration implemented in **LegalConnect**.

---

## 1. Architecture & Payment Flow

```
[ User Browser / React 19 Frontend ]
                │
                │ 1. Book Consultation (Preferred Date/Time, Mode, Case)
                ▼
[ Spring Boot Backend: POST /api/consultations ] ──► [ PostgreSQL: consultations ]
                │
                │ 2. POST /api/payments/create-order { consultationId } (JWT Auth)
                ▼
[ Backend: PaymentService ]
   ├─ Validates consultation ownership (SecurityContext)
   ├─ Looks up verified lawyer consultation fee in DB (Never trusts client amount)
   ├─ Converts INR to paise (1 INR = 100 paise)
   ├─ Calls Razorpay API: `orders.create()`
   └─ Saves PaymentEntity in PostgreSQL (Status: CREATED)
                │
                │ 3. Returns { orderId, amountInPaise, keyId, currency }
                ▼
[ Frontend: Razorpay Standard Checkout SDK ]
   ├─ Opens Razorpay popup modal in TEST MODE
   └─ User inputs official Razorpay test card / netbanking credentials
                │
                │ 4. Razorpay returns { razorpay_order_id, razorpay_payment_id, razorpay_signature }
                ▼
[ Frontend: POST /api/payments/verify ] (JWT Auth)
                │
                ▼
[ Backend: PaymentService.verifyPayment() ]
   ├─ Verifies HMAC-SHA256 signature using `RAZORPAY_KEY_SECRET`
   ├─ Fetches payment from Razorpay API to confirm `captured` status
   ├─ Idempotent: prevents duplicate verification
   ├─ Updates PaymentEntity to SUCCESS
   └─ Updates Consultation paymentStatus to PAID
                │
                ▼
[ Frontend: Displays Verified Receipt & Records in Payment History ]
```

---

## 2. Environment Variables Configuration

Set these environment variables before starting the backend application:

```bash
# Razorpay TEST MODE Credentials (DO NOT USE LIVE KEYS)
RAZORPAY_KEY_ID=rzp_test_YourKeyIdHere
RAZORPAY_KEY_SECRET=YourKeySecretHere
RAZORPAY_WEBHOOK_SECRET=YourWebhookSecretHere

# PostgreSQL Database
SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/legalconnect
SPRING_DATASOURCE_USERNAME=postgres
SPRING_DATASOURCE_PASSWORD=root
```

Security Rules Applied:
- `RAZORPAY_KEY_SECRET` and `RAZORPAY_WEBHOOK_SECRET` are strictly kept on the backend server.
- The frontend dynamically receives only `keyId` from the authenticated backend order response or `/api/payments/config`.
- `.env` files are excluded in `.gitignore`.

---

## 3. How to Obtain Razorpay TEST MODE Credentials

1. Log into your [Razorpay Dashboard](https://dashboard.razorpay.com).
2. Look at the top bar and ensure the toggle is set to **Test Mode** (Dark Amber / Test Badge). **Never use Live Mode**.
3. Navigate to **Settings** → **API Keys**.
4. Click **Generate Test Key** (or copy your existing Key ID and Key Secret).
   - **Key ID format:** `rzp_test_...`
   - **Key Secret:** 24+ character secret string.
5. Store them securely in your backend environment or `.env` file.

---

## 4. Official Razorpay Test Payment Methods

> Official Documentation: [Razorpay Payments Testing Guide](https://razorpay.com/docs/payments/payments/test-card-details/)

### A. Test Cards (Domestic Credit / Debit)

| Field | Value |
| :--- | :--- |
| **Card Number** | `4000 0000 0000 0002` (Success card) |
| **Expiry Date** | Any valid future date (e.g., `12/28`) |
| **Cardholder Name** | Any name (e.g., `Ananya Mehta`) |
| **CVV** | Any 3 digits (e.g., `123`) |
| **OTP** | `123456` or click **Success** on the Razorpay bank simulator screen |

### Test Card for Failed Payment Simulation
| Field | Value | Expected Outcome |
| :--- | :--- | :--- |
| **Card Number** | `4000 0000 0000 0005` | Card declined / Payment failed |

### B. Test UPI
- Virtual Payment Address (VPA): `success@razorpay` (Simulates instant approval)
- `failure@razorpay` (Simulates bank rejection)

### C. Test Netbanking
- Select any popular bank (e.g., HDFC, ICICI, SBI) from the list.
- On the simulated bank portal, choose **Success** or **Failure**.

---

## 5. Webhook Configuration Instructions

Webhooks ensure that payment captures, failures, or refunds are synchronized server-to-server even if a user closes their browser prematurely.

### 5.1 Local Testing with Public HTTPS Tunnel
Because Razorpay's servers need to deliver webhooks over the public internet to your local machine:

1. Start an HTTPS tunnel (e.g. using `ngrok` or `localtunnel`):
   ```bash
   ngrok http 8080
   ```
2. Copy the generated HTTPS forwarding URL (e.g., `https://abcdef1234.ngrok-free.app`).

### 5.2 Configuring the Webhook in Razorpay Dashboard
1. Go to [Razorpay Dashboard](https://dashboard.razorpay.com) in **Test Mode**.
2. Navigate to **Settings** → **Webhooks**.
3. Click **Add New Webhook**.
4. Set the **Webhook URL** to:
   ```
   https://YOUR_TUNNEL_URL/api/payments/webhook
   ```
   *(Example: `https://abcdef1234.ngrok-free.app/api/payments/webhook`)*
5. Enter a strong secret string in **Secret** (e.g., `LegalConnect_Webhook_Secret_2026`).
6. Under **Active Events**, select:
   - `payment.captured`
   - `payment.failed`
   - `refund.processed`
7. Click **Save Webhook**.
8. Set that exact secret as your backend environment variable:
   ```bash
   RAZORPAY_WEBHOOK_SECRET=LegalConnect_Webhook_Secret_2026
   ```

---

## 6. How to Run LegalConnect

### Step 1: Start PostgreSQL
Ensure PostgreSQL is running on port 5432 and the `legalconnect` database is created:
```sql
CREATE DATABASE legalconnect;
```

### Step 2: Run Backend (Spring Boot)
In `LegalConnect/Backend`:
```bash
# Windows PowerShell
$env:RAZORPAY_KEY_ID="rzp_test_YourKeyId"
$env:RAZORPAY_KEY_SECRET="YourKeySecret"
$env:RAZORPAY_WEBHOOK_SECRET="YourWebhookSecret"
.\mvnw.cmd spring-boot:run
```
Backend will start on `http://localhost:8080`.
Swagger UI documentation will be available at `http://localhost:8080/swagger-ui.html`.

### Step 3: Run Frontend (React 19 + Vite)
In `LegalConnect/Frontend`:
```bash
npm run dev
```
Frontend will be accessible at `http://localhost:5173`.

---

## 7. Step-by-Step Payment Verification Workflow

1. Open `http://localhost:5173` and click **Login**.
2. Click **Client Demo Login** (`user@demo.com` / `demo123`).
3. Click **Find Lawyers** on the dashboard.
4. Select any lawyer (e.g., *Adv. Kavya Iyer*, Fee: ₹1,500).
5. On the lawyer profile, click **Book & Pay Consultation**.
6. Select date, time, consultation mode (Video/Phone/In-Person), and description.
7. Click **Proceed to Payment (Test Mode)**.
8. The official Razorpay Standard Checkout opens in **Test Mode**.
9. Enter the test card details:
   - Card Number: `4000 0000 0000 0002`
   - Expiry: `12/28`, CVV: `123`
10. Click **Pay ₹1,500**. On the bank OTP screen, click **Success**.
11. The backend verifies the HMAC-SHA256 signature and captures the status.
12. The frontend displays the verified transaction receipt.
13. Visit **Payment History** from the sidebar to inspect the recorded transaction.

---

## 8. Common Troubleshooting

| Issue | Cause | Solution |
| :--- | :--- | :--- |
| `Razorpay TEST credentials are not configured` | Environment variables missing | Set `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` before launching the backend. |
| `Invalid payment signature` | Mismatch between Key Secret and Order | Verify that `RAZORPAY_KEY_SECRET` matches the Key ID used in checkout. |
| `Razorpay checkout modal does not open` | Script blocked or network error | Verify `https://checkout.razorpay.com/v1/checkout.js` is reachable and ad-blockers are disabled. |
| `Only clients can initiate payments` | Logged in as Lawyer or Admin | Log in with a client account (`USER` role) to book and pay for consultations. |
