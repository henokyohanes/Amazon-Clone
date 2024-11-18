import { ActionTypes } from "./actionType";

// Initial state of the application
export const initialState = {
  cart: [],
  user: null,
};

// Reducer function to handle state changes based on actions
export const reducer = (state, action) => {
  switch (action.type) {

    // Case to add an item to the cart
    case ActionTypes.ADD_TO_CART:

      // Check if the item already exists in the cart
      const existingItem = state.cart.find(
        (item) => item.id === action.item.id
      );
      if (existingItem) {

        // If the item already exists, update its quantity by 1
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === existingItem.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {

        // If the item doesn't exist, add it to the cart with a quantity of 1
        return {
          ...state,
          cart: [...state.cart, { ...action.item, quantity: 1 }],
        };
      }

    // Case to remove an item from the cart
    case ActionTypes.REMOVE_FROM_CART:

      // Find the index of the item to be removed
      const itemIndex = state.cart.findIndex(
        (item) => item.id === action.item.id
      );
      if (itemIndex >= 0) {

        // Create a copy of the cart array
        const updatedCart = [...state.cart];

        if (updatedCart[itemIndex].quantity > 1) {

          // If quantity is greater than 1, decrease the quantity by 1
          updatedCart[itemIndex] = {
            ...updatedCart[itemIndex],
            quantity: updatedCart[itemIndex].quantity - 1,
          };
        } else {

          // If quantity is 1, remove the item completely from the cart
          updatedCart.splice(itemIndex, 1);
        }
        return {

          // Update the cart with the modified list
          ...state,
          cart: updatedCart,
        };
      }

      // If the item doesn't exist in the cart, return the current state
      return state;

    // Case to reset the cart
    case ActionTypes.RESET_CART:
      return {

        // Reset the cart to an empty array
        ...state,
        cart: [],
      };

    // Case to set the user information in the state
    case ActionTypes.SET_USER:
      return {
        
        // Set the user information from the action payload
        ...state,
        user: action.user,
      };

    // Default case to return the current state if no action matches
    default:
      return state;
  }
};
