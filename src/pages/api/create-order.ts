// import type { APIRoute } from 'astro';
// import { createOrder } from '../../lib/razorpay';

// export const POST: APIRoute = async ({ request }) => {
//   try {
//     const { amount } = await request.json();
    
//     if (!amount) {
//       return new Response(JSON.stringify({ error: 'Amount is required' }), {
//         status: 400
//       });
//     }

//     const order = await createOrder(amount);
    
//     return new Response(JSON.stringify(order), {
//       status: 200,
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     });
//   } catch (error) {
//     console.error('Error creating order:', error);
//     return new Response(JSON.stringify({ error: 'Failed to create order' }), {
//       status: 500
//     });
//   }
// };