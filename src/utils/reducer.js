import { ActionTypes } from "./actionType";

export const initialState = {
  cart: [],
  user: null,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.ADD_TO_CART:
      const existingItem = state.cart.find(
        (item) => item.id === action.item.id
      );
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === existingItem.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, { ...action.item, quantity: 1 }],
        };
      }

    case ActionTypes.REMOVE_FROM_CART:
      const itemIndex = state.cart.findIndex(
        (item) => item.id === action.item.id
      );
      if (itemIndex >= 0) {
        const updatedCart = [...state.cart]; // Create a copy of the cart

        if (updatedCart[itemIndex].quantity > 1) {
          // Decrease quantity
          updatedCart[itemIndex] = {
            ...updatedCart[itemIndex],
            quantity: updatedCart[itemIndex].quantity - 1,
          };
        } else {
          // Remove item if quantity is 1
          updatedCart.splice(itemIndex, 1);
        }
        return {
          ...state,
          cart: updatedCart,
        };
      }

      return state;
      
    case ActionTypes.RESET_CART:
      return {
        ...state,
        cart: [],
      };

    case ActionTypes.SET_USER:
      return {
        ...state,
        user: action.user,
      };

    default:
      return state;
  }
};
