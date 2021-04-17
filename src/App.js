import './App.css';
import { Routes, Route, NavLink } from 'react-router-dom';
import { Home, Cart, Products, Wishlist, Error404 } from './pages';
import { NavbarMobile } from './components';

function App() {
  return (
    <>
      {/* <button onClick={() => setRoute('products')}>Products</button>
      <button onClick={() => setRoute('wishlist')}>Wishlist</button>
      <button onClick={() => setRoute('cart')}>Cart</button>

      {route === 'products' && <Products setRoute={setRoute} />}
      {route === 'wishlist' && <Wishlist />}
      {route === 'cart' && <Cart />} */}

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

      <NavbarMobile />

      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<Products />} />
        <Route path="/products" element={<Products />} />
        {/* <Route path="/:productID" element={<ProductPage />} /> */}
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </>
  );
}

export default App;
