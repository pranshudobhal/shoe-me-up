import './App.css';
import { Routes, Route } from 'react-router-dom';
// import { Home, Cart, Products, Wishlist, Error404 } from './pages';
import { Cart, Products, ProductPage, Wishlist, Error404 } from './pages';
import { Navbar } from './components';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<Products />} />
        <Route path="/products" element={<Products />} />
        <Route path="/:productID" element={<ProductPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </>
  );
}

export default App;
