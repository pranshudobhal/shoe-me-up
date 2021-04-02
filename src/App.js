import './App.css';
import { Products } from './Products';
import { Cart } from './Cart';
import { useState } from 'react';

export function Wishlist() {
  return <h1>I am WISHLIST!!!</h1>;
}

function App() {
  const [route, setRoute] = useState('products');

  return (
    <>
      <button onClick={() => setRoute('products')}>Products</button>
      <button onClick={() => setRoute('wishlist')}>Wishlist</button>
      <button onClick={() => setRoute('cart')}>Cart</button>

      {route === 'products' && <Products />}
      {route === 'wishlist' && <Wishlist />}
      {route === 'cart' && <Cart />}
    </>
  );
}

export default App;
