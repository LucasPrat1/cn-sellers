'use client'

import { createContext, useContext, useReducer } from 'react';
import { reducer } from './reducer';

export const StoreContext = createContext()

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a provider')
  }
  return context
}

const StoreProvider = ({ children }) => {
  const initialState = {
    clients: [],
    payments: [],
    isLoading: false,
    error: false
  };

  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <StoreContext.Provider
      value={{state, dispatch}}
    >
      {children}
    </StoreContext.Provider>
  )
}

export default StoreProvider

