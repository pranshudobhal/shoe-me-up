import { createContext, useContext, useReducer } from 'react';
import { data } from './data';

const DataContext = createContext();

export function DataProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, {
    sortBy: null,
    showInventoryAll: true,
    showFastDelivery: false,
    cart: [],
    wishlist: [],
    products: data,
  });

  return (
    <DataContext.Provider
      value={{
        sortBy: state.sortBy,
        showInventoryAll: state.showInventoryAll,
        showFastDelivery: state.showFastDelivery,
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

const reducer = (state, action) => {
  switch (action.type) {
    case 'SORT':
      return {
        ...state,
        sortBy: action.payload,
      };

    case 'TOGGLE_INVENTORY':
      return {
        ...state,
        showInventoryAll: !state.showInventoryAll,
      };

    case 'TOGGLE_DELIVERY':
      return {
        ...state,
        showFastDelivery: !state.showFastDelivery,
      };
    case 'ADD_TO_CART':
      return { ...state, cart: [...state.cart, { ...action.payload, quantity: 1 }] };

    case 'INCREMENT_IN_CART':
      return {
        ...state,
        cart: state.cart.map((cartItem) => {
          if (action.payload.quantity < 9 && cartItem.id === action.payload.id) {
            return { ...cartItem, quantity: cartItem.quantity + 1 };
          }
          return cartItem;
        }),
      };

    case 'DECREMENT_IN_CART':
      return {
        ...state,
        cart: state.cart
          .map((cartItem) => {
            if (action.payload.quantity > 1 && cartItem.id === action.payload.id) {
              return { ...cartItem, quantity: cartItem.quantity - 1 };
            } else {
              return undefined;
            }
          })
          .filter((cartItem) => cartItem !== undefined),
      };

    default:
      throw new Error('error in reducer');
  }
};
