import axios from 'axios';
import { API_URL } from '../../utils';

export const toggleFavourite = async (id, isInWishlist, dataDispatch, cartItem) => {
  try {
    let response;

    if (isInWishlist) {
      response = await axios.delete(`${API_URL}/wishlist/${id}`);
    } else {
      response = await axios.post(`${API_URL}/wishlist`, { product: { _id: id } });
    }

    if (response.status === 200) {
      dataDispatch({ type: 'TOGGLE_FAVOURITE', payload: cartItem });
    }
  } catch (error) {
    console.error('Error adding to wishlist ', error);
  }
};
