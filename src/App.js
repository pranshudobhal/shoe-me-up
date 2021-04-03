import './App.css';
import { Products } from './Products';
import { Wishlist } from './Wishlist';
import { Cart } from './Cart';

import { useState } from 'react';
import { NavLink } from 'react-router-dom';

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
