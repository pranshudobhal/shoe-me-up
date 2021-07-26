import axios from 'axios';
import { API_URL, RAZORPAY_CHECKOUT_API } from '../../utils';
import { clearCart } from './Cart.services';

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

export const placeOrder = async (user, totalPrice) => {
  const res = await loadScript(`${RAZORPAY_CHECKOUT_API}`);

  if (!res) {
    alert('Razorpay SDK failed to load. Are you online?');
    return;
  }

  const newOrder = await axios.post(`${API_URL}/payment/orders`, { totalPrice });

  if (!newOrder) {
    alert('Server error. Are you online?');
    return;
  }

  const { amount, id: order_id, currency } = newOrder.data.order;

  const options = {
    key: 'rzp_test_zOkKQUoSy2E7re',
    amount: amount.toString(),
    currency: currency,
    name: 'ShoeMeUp',
    description: 'Test Transaction',
    order_id: order_id,
    handler: async function (response) {
      const data = {
        orderCreationId: order_id,
        razorpayPaymentId: response.razorpay_payment_id,
        razorpayOrderId: response.razorpay_order_id,
        razorpaySignature: response.razorpay_signature,
      };

      const result = await axios.post(`${API_URL}/payment/success`, data);

      alert(result.data.message);

      if (result.data.success) {
        clearCart();
        window.location.href = '/cart';
      }
    },
    prefill: {
      name: user.firstName,
      email: user.email,
      contact: '9876543210',
    },
    notes: {
      address: 'ShoeMeUp',
    },
    theme: {
      color: '#111',
    },
  };

  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
};
