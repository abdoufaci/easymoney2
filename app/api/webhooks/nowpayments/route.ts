// app/api/nowpayments-webhook/route.ts (or .js)

import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import db from "@/lib/db";
import { v4 } from "uuid";

// IMPORTANT: Replace with your actual IPN Secret Key from NOWPayments dashboard
const NOWPAYMENTS_IPN_SECRET = process.env.NOW_PAYMENT_IPN_KEY!; // Use environment variable!

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text(); // Get the raw body as text for verification
    const signature = req.headers.get("x-nowpayments-sig");

    if (!signature) {
      console.warn("NOWPayments Webhook: Missing X-NOWPAYMENTS-SIG header.");
      return NextResponse.json(
        { message: "Signature header missing" },
        { status: 400 }
      );
    }

    // Sort parameters alphabetically and convert to JSON string
    // IMPORTANT: The raw body must be used for signing, not a parsed JSON object,
    // as stringification order might differ.
    // The signature is calculated on the raw JSON string received from NOWPayments.
    // If the body is already parsed to JSON, reserializing it might alter the order.
    // So, we use the rawBody directly.

    // Calculate your signature
    const hmac = crypto.createHmac("sha512", NOWPAYMENTS_IPN_SECRET);
    hmac.update(rawBody);
    const calculatedSignature = hmac.digest("hex");

    // Compare signatures
    if (calculatedSignature !== signature) {
      console.error("NOWPayments Webhook: Invalid signature!");
      return NextResponse.json(
        { message: "Invalid signature" },
        { status: 403 }
      ); // Forbidden
    }

    // --- Signature is valid, now parse the body and process the payment ---
    const paymentData = JSON.parse(rawBody); // Parse the body now that it's verified

    const {
      payment_id,
      payment_status,
      pay_address,
      pay_amount,
      pay_currency,
      order_id, // Your order ID from when you created the invoice
      price_amount,
      price_currency,
      invoice_id,
      order_description,
      // ... other fields from NOWPayments
    } = paymentData;

    const userId = order_id;
    console.log(`  Payment ID: ${payment_id}`);
    console.log(`  Amount: ${price_amount} ${price_currency}`);
    const coursesMatch = order_description.match(/courses=([^;]*)/);
    const followupMatch = order_description.match(/followup=(\d)/);

    const courseIds: string[] = coursesMatch?.[1]?.split(",") || [];
    const isFollowup = followupMatch?.[1] === "1";

    console.log("courseIds:", courseIds);
    console.log("isFollowup:", isFollowup);
    // console.log('Full Payload:', paymentData); // Uncomment for full debugging

    // --- YOUR APPLICATION LOGIC HERE ---
    // Based on `payment_status`, update your database, send emails, grant access, etc.

    switch (payment_status) {
      case "finished":
        // Payment is finished (funds sent to payout address, or refund processed)
        // This is typically the final status after 'sending' or 'confirmed'
        if (isFollowup) {
          // add the followUp
          const OpenGroup = await db.group.findFirst({
            where: {
              status: "OPEN",
            },
          });

          if (!!OpenGroup) {
            await db.group.update({
              where: {
                id: OpenGroup.id,
              },
              data: {
                members: {
                  connect: { id: userId },
                },
              },
            });
          } else {
            const waitList = await db.waitList.findFirst();
            if (!!waitList) {
              await db.user.update({
                where: { id: userId },
                data: {
                  waitList: {
                    connect: { id: waitList.id },
                  },
                },
              });
            } else {
              const wait = await db.waitList.create({
                data: {
                  id: v4(),
                },
              });
              await db.user.update({
                where: { id: userId },
                data: {
                  waitList: {
                    connect: { id: wait.id },
                  },
                },
              });
            }
          }
        }
        if (!!courseIds.length) {
          await db.user.update({
            where: {
              id: userId,
            },
            data: {
              courses: {
                connect: courseIds.map((id) => ({ id })),
              },
            },
          });
        }

        await db.payment.create({
          data: {
            paymentId: `${payment_id}`,
            userId,
            price: `${price_amount}`,
            status:
              !!courseIds.length && isFollowup
                ? "BOTH"
                : !!courseIds.length
                ? "COURSE"
                : "FOLLOWUP",
            courses: {
              connect: courseIds.map((id) => ({ id })),
            },
          },
        });
        console.log(`Payment ${payment_id} (Order ${order_id}) is finished.`);
        break;
      default:
        return;
    }

    // Always return a 200 OK to NOWPayments to acknowledge receipt
    return NextResponse.json(
      { message: "Webhook received successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing NOWPayments webhook:", error);
    // Return a non-200 status code to indicate an error, so NOWPayments might retry
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// For local development with `ngrok`, you can access this at:
// YOUR_NGROK_URL/api/nowpayments-webhook
