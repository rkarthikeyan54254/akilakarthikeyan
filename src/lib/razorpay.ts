import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: import.meta.env.RAZORPAY_KEY_ID,
  key_secret: import.meta.env.RAZORPAY_KEY_SECRET
});

export async function createOrder(amount: number) {
  try {
    const options = {
      amount: amount * 100, // Amount in paise
      currency: "INR",
      receipt: "order_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);
    return order;
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    throw error;
  }
}

export async function verifyPayment(orderId: string, paymentId: string, signature: string) {
  try {
    const text = orderId + "|" + paymentId;
    const generated_signature = crypto
      .createHmac("sha256", import.meta.env.RAZORPAY_KEY_SECRET)
      .update(text)
      .digest("hex");

    return generated_signature === signature;
  } catch (error) {
    console.error('Error verifying payment:', error);
    throw error;
  }
}