import './App.css';
import { Products } from './Products';
import { Wishlist } from './Wishlist';
import { Cart } from './Cart';
// import NoMatch from './erro404';

import { useState } from 'react';
// import { Routes, Route, NavLink } from 'react-router-dom';

function App() {
  const [route, setRoute] = useState('products');

  return (
    <>
      <button onClick={() => setRoute('products')}>Products</button>
      <button onClick={() => setRoute('wishlist')}>Wishlist</button>
      <button onClick={() => setRoute('cart')}>Cart</button>

      {route === 'products' && <Products setRoute={setRoute} />}
      {route === 'wishlist' && <Wishlist />}
      {route === 'cart' && <Cart />}

      {/* <nav>
        <NavLink end to="/" style={{ textDecoration: 'none' }} activeStyle={{ color: 'red' }}>
          Products
        </NavLink>{' '}
        ||
        <NavLink to="/wishlist" style={{ textDecoration: 'none' }} activeStyle={{ color: 'red' }}>
          Wishlist
        </NavLink>{' '}
        ||
        <NavLink to="/cart" style={{ textDecoration: 'none' }} activeStyle={{ color: 'red' }}>
          Cart
        </NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<NoMatch />} />
      </Routes> */}
    </>
  );
}

export default App;
