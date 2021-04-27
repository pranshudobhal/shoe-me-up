export const initialState = {
  sortBy: null,
  showInventoryAll: true,
  showFastDelivery: false,
  priceSlider: 1000,
  cart: [],
  wishlist: [],
  products: [],
};

export const dataReducer = (state, action) => {
  switch (action.type) {
    case 'INITIALIZE_PRODUCTS':
      return { ...state, products: action.payload };

    case 'SORT':
      return {
        ...state,
        sortBy: action.payload,
      };

    case 'PRICE_RANGE':
      return { ...state, priceSlider: action.payload };

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
      return { ...state, cart: [...state.cart, { ...action.payload, quantity: 1 }], wishlist: state.wishlist.filter((wishlistItem) => wishlistItem.id !== action.payload.id) };

    case 'UPDATE_QUANTITY':
      return {
        ...state,
        cart: state.cart.map((cartItem) => {
          if (cartItem.id === action.payload.cartItemID) {
            return { ...cartItem, quantity: action.payload.value };
          }
          return cartItem;
        }),
      };

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter((cartItem) => cartItem.id !== action.payload.id),
      };

    case 'TOGGLE_FAVOURITE':
      return {
        ...state,
        wishlist: state.wishlist.find((wishlistItem) => wishlistItem.id === action.payload.id) ? state.wishlist.filter((wishlistItem) => wishlistItem.id !== action.payload.id) : [...state.wishlist, { ...action.payload }],
        cart: state.cart.filter((cartItem) => cartItem.id !== action.payload.id),
      };

    default:
      throw new Error('error in reducer');
  }
};
