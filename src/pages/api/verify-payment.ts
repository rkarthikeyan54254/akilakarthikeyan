import type { APIRoute } from 'astro';
import { verifyPayment } from '../../lib/razorpay';

export const POST: APIRoute = async ({ request }) => {
  try {
    const { orderId, paymentId, signature } = await request.json();
    
    if (!orderId || !paymentId || !signature) {
      return new Response(JSON.stringify({ error: 'Missing required parameters' }), {
        status: 400
      });
    }

    const isValid = await verifyPayment(orderId, paymentId, signature);
    
    return new Response(JSON.stringify({ valid: isValid }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error verifying payment:', error);
    return new Response(JSON.stringify({ error: 'Failed to verify payment' }), {
      status: 500
    });
  }
};