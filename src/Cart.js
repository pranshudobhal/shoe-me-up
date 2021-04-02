import { useData } from './dataContext';
import CartCard from './CartCard';

export function Cart() {
  const { cart } = useData();

  return (
    <div>
      {cart.map((cartItem) => {
        return <CartCard cartItem={cartItem} />;
      })}
    </div>
  );
}
