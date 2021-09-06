export const initialState = {
  sortBy: null,
  showInventoryAll: true,
  showFastDelivery: false,
  priceSlider: 25000,
  cart: [],
  wishlist: [],
  products: [],
};

export const dataReducer = (state, action) => {
  switch (action.type) {
    case 'INITIALIZE_PRODUCTS':
      return { ...state, products: action.payload };

    case 'INITIALIZE_CART':
      console.log(action.payload);
      return { ...state, cart: action.payload };

    case 'INITIALIZE_WISHLIST':
      return { ...state, wishlist: action.payload };

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
      return { ...state, cart: [...state.cart, { ...action.payload, qty: 1 }] };

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter((cartItem) => cartItem._id !== action.payload._id),
      };

    case 'UPDATE_QUANTITY_IN_CART':
      return {
        ...state,
        cart: state.cart.map((cartItem) => {
          if (cartItem._id === action.payload.cartItemID) {
            return { ...cartItem, qty: action.payload.value };
          }
          return cartItem;
        }),
      };

    case 'TOGGLE_FAVOURITE':
      return {
        ...state,
        wishlist: state.wishlist.find((wishlistItem) => wishlistItem._id === action.payload._id) ? state.wishlist.filter((wishlistItem) => wishlistItem._id !== action.payload._id) : [...state.wishlist, { ...action.payload }],
      };

    case 'RESET_STATE':
      return {
        ...state,
        sortBy: null,
        showInventoryAll: true,
        showFastDelivery: false,
        priceSlider: 25000,
        wishlist: [],
      };

    default:
      throw new Error('Error in reducer');
  }
};
