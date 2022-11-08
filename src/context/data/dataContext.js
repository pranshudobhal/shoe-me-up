import { createContext, useContext, useReducer } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { dataReducer, initialState } from '../../reducer/dataReducer';
import { useAuth } from '../auth/authContext';
import { API_URL } from '../../utils';

const DataContext = createContext();

export function DataProvider({ children }) {
  const [state, dispatch] = useReducer(dataReducer, initialState);

  const { token } = useAuth();

  useEffect(() => {
    (async function fetchDataFromServer() {
      try {
        const productsResponse = await axios.get(`${API_URL}/products`);
        dispatch({ type: 'INITIALIZE_PRODUCTS', payload: productsResponse.data.products });

        if (token) {
          const cartResponse = await axios.get(`${API_URL}/cart`);
          const wishlistResponse = await axios.get(`${API_URL}/wishlist`);
          dispatch({ type: 'INITIALIZE_CART', payload: cartResponse.data.cart.products });
          dispatch({ type: 'INITIALIZE_WISHLIST', payload: wishlistResponse.data.wishlist.products });
        } else {
          dispatch({ type: 'RESET_STATE' });
        }
      } catch (error) {
        console.error('Error initializing data from backend!!! ' + error);
      }
    })();
  }, [token]);

  return (
    <DataContext.Provider
      value={{
        sortBy: state.sortBy,
        showInventoryAll: state.showInventoryAll,
        showFastDelivery: state.showFastDelivery,
        priceSlider: state.priceSlider,
        cart: state.cart,
        wishlist: state.wishlist,
        products: state.products,
        dataDispatch: dispatch,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  return useContext(DataContext);
}
