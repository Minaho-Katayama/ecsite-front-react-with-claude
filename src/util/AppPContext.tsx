import React, { createContext, useContext, useReducer, ReactNode } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  imageSrc: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface Order {
  id: string;
  items: CartItem[];
  total: number;
  date: Date;
}

interface AppState {
  cart: CartItem[];
  orders: Order[];
}

type Action =
  | { type: 'ADD_TO_CART'; payload: { product: Product; quantity: number } }
  | { type: 'UPDATE_CART_ITEM'; payload: { id: number; quantity: number } }
  | { type: 'REMOVE_FROM_CART'; payload: { id: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'ADD_ORDER'; payload: { order: Order } };

const initialState: AppState = {
  cart: [],
  orders: [],
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<Action>;
} | undefined>(undefined);

const appReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItem = state.cart.find(item => item.id === action.payload.product.id);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.payload.product.id
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          ),
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, { ...action.payload.product, quantity: action.payload.quantity }],
        };
      }
    case 'UPDATE_CART_ITEM':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload.id),
      };
    case 'CLEAR_CART':
      return {
        ...state,
        cart: [],
      };
    case 'ADD_ORDER':
      return {
        ...state,
        orders: [...state.orders, action.payload.order],
        cart: [],
      };
    default:
      return state;
  }
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};