import { useData } from './dataContext';
import CartCard from './CartCard';

export function Cart() {
  const { cart } = useData();

  return (
    <div>
      {cart.length === 0
        ? 'cart is empty'
        : cart.map((cartItem) => {
            return <CartCard cartItem={cartItem} />;
          })}

      <div>Total Price</div>

      <div>
        <div>Subtotal ={cart.reduce((total, current) => total + current.price * current.quantity, 0)}</div>
        <div>Total = {cart.reduce((total, current) => total + current.price * current.quantity, 0)}</div>
      </div>
    </div>
  );
}
