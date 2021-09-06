import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Login, SignUp, Cart, Products, ProductPage, Wishlist, Error404 } from './pages';
import { Navbar } from './components';
import { PrivateRoute } from './PrivateRoute';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/products" element={<Products />} />
        <Route path="/:productID" element={<ProductPage />} />
        <Route path="/cart" element={<Cart />} />
        <PrivateRoute path="/wishlist" element={<Wishlist />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </>
  );
}

export default App;
