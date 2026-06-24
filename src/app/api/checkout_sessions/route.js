// import { NextResponse } from 'next/server'
// import { headers } from 'next/headers'

// import { stripe } from '../../../lib/stripe'

// export async function POST() {
//   try {
//     const headersList = await headers()
//     const origin = headersList.get('origin')

//     // Create Checkout Sessions from body params.
//     const session = await stripe.checkout.sessions.create({
//       line_items: [
//         {
//           // Provide the exact Price ID (for example, price_1234) of the product you want to sell
//           price: '{{PRICE_ID}}',
//           quantity: 1,
//         },
//       ],
//       mode: 'payment',
//       success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
//     });
//     return NextResponse.redirect(session.url, 303)
//   } catch (err) {
//     return NextResponse.json(
//       { error: err.message },
//       { status: err.statusCode || 500 }
//     )
//   }
// }


import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// স্ট্রাইপ ক্লায়েন্ট ইনিশিয়ালাইজ করা
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    const body = await request.json();
    const { bookingId, amount } = body;

    if (!bookingId || !amount) {
      return NextResponse.json(
        { message: 'Missing bookingId or amount' },
        { status: 400 }
      );
    }

    // ১. সিকিউরিটি চেক (ঐচ্ছিক কিন্তু রিকমেন্ডেড): 
    // আপনি চাইলে এখানে ডাটাবেজ থেকে bookingId দিয়ে আবার চেক করতে পারেন যে পরিমাণ ঠিক আছে কিনা।

    // ২. স্ট্রাইপ সেন্ট/পয়সায় হিসাব করে। ১ টাকা = ১০০ পয়সা। 
    const unitAmount = Math.round(amount * 100);

    // ৩. স্ট্রাইপ চেকআউট সেশন তৈরি
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      // পেমেন্ট সফল বা ক্যানসেল হলে ইউজার যেখানে যাবে
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/my-bookings?success=true&booking_id=${bookingId}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/my-bookings?canceled=true`,
      
      // আপনার ডাইনামিক টিকিটের ডেটা এখানে পাস হচ্ছে
      line_items: [
        {
          price_data: {
            currency: 'usd', // স্ট্রাইপে সাধারণত BDT সরাসরি সাপোর্ট করে না, তাই usd ব্যবহার করা নিরাপদ
            product_data: {
              name: `Ticket Booking #${bookingId.substring(0, 8)}`, // ডাইনামিক নাম
              description: `Payment for booking ID: ${bookingId}`,
            },
            unit_amount: unitAmount, // ডাইনামিক দাম
          },
          quantity: 1,
        },
      ],
      // ডাটাবেজ আপডেট করার সুবিধার্থে metadata-তে bookingId সেভ করে রাখা
      metadata: {
        bookingId: bookingId,
      },
    });

    // আপনার ফ্রন্টএন্ড এই url-এই রিডাইরেক্ট করবে
    return NextResponse.json({ url: session.url });

  } catch (error) {
    console.error('Stripe Error:', error);
    return NextResponse.json(
      { message: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}