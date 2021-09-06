import axios from 'axios';
import { API_URL } from '../../utils';

export const addToCart = async (id, dataDispatch, product) => {
  try {
    const response = await axios.post(`${API_URL}/cart`, { product: { _id: id } });

    if (response.status === 200) {
      dataDispatch({ type: 'ADD_TO_CART', payload: product });
    }
  } catch (error) {
    console.error('Error adding to cart ', error);
  }
};

export const removeFromCart = async (id, dataDispatch, cartItem) => {
  try {
    const response = await axios.delete(`${API_URL}/cart/${id}`);

    if (response.status === 200) {
      dataDispatch({ type: 'REMOVE_FROM_CART', payload: cartItem });
    }
  } catch (error) {
    console.error('Error deleting product from cart ', error);
  }
};

export const updateQuantityInCart = async (e, id, dataDispatch) => {
  try {
    const updatedQuantity = e.target.value;
    const response = await axios.post(`${API_URL}/cart/${id}`, { qty: updatedQuantity });

    if (response.status === 200) {
      dataDispatch({ type: 'UPDATE_QUANTITY_IN_CART', payload: { cartItemID: id, value: updatedQuantity } });
    }
  } catch (error) {
    console.error('Error updating quantity in cart ', error);
  }
};

export const clearCart = () => {
  return axios.delete(`${API_URL}/cart`);
};

export const addToLocalStorage = (id, dataDispatch, product) => {
  //add or remove to local storage and state

  //add product to cart
  const cartFromLocalStorage = JSON.parse(localStorage.getItem('cart')) || [];

  cartFromLocalStorage.push({ ...product, qty: 1 });

  localStorage.setItem('cart', JSON.stringify(cartFromLocalStorage));

  //add product to state
  dataDispatch({ type: 'ADD_TO_CART', payload: product });
};

export const removeFromLocalStorage = (dataDispatch, product) => {
  const cartFromLocalStorage = JSON.parse(localStorage.getItem('cart')) || [];

  if (cartFromLocalStorage.length > 0) {
    const newCartFromLocalStorage = cartFromLocalStorage.filter((cartItem) => cartItem._id !== product._id);

    localStorage.setItem('cart', JSON.stringify(newCartFromLocalStorage));

    dataDispatch({ type: 'REMOVE_FROM_CART', payload: product });
  }
};
