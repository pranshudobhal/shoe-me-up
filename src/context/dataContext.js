import { createContext, useContext, useReducer } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { dataReducer, initialState } from '../reducer/dataReducer';

const DataContext = createContext();

export function DataProvider({ children }) {
  const [state, dispatch] = useReducer(dataReducer, initialState);

  useEffect(() => {
    (async function fetchDataFromServer() {
      try {
        const productsResponse = await axios.get('https://shoemeup.pranshudobhal.repl.co/products');
        const cartResponse = await axios.get('https://shoemeup.pranshudobhal.repl.co/cart');
        const wishlistResponse = await axios.get('https://shoemeup.pranshudobhal.repl.co/wishlist');
        dispatch({ type: 'INITIALIZE_PRODUCTS', payload: productsResponse.data.products });
        dispatch({ type: 'INITIALIZE_CART', payload: cartResponse.data.cart });
        dispatch({ type: 'INITIALIZE_WISHLIST', payload: wishlistResponse.data.wishlist });
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

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
