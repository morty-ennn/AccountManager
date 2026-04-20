import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { PasswordItem, PasswordState, PasswordAction } from '../types';
import { savePasswords, loadPasswords } from '../utils/storage';

const initialState: PasswordState = {
  passwords: [],
  searchQuery: '',
  loading: true,
};

const passwordReducer = (state: PasswordState, action: PasswordAction): PasswordState => {
  switch (action.type) {
    case 'SET_PASSWORDS':
      return { ...state, passwords: action.payload };
    case 'ADD_PASSWORD':
      return { ...state, passwords: [...state.passwords, action.payload] };
    case 'UPDATE_PASSWORD':
      return {
        ...state,
        passwords: state.passwords.map(p =>
          p.id === action.payload.id ? action.payload : p
        ),
      };
    case 'DELETE_PASSWORD':
      return {
        ...state,
        passwords: state.passwords.filter(p => p.id !== action.payload),
      };
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

interface PasswordContextType {
  state: PasswordState;
  dispatch: React.Dispatch<PasswordAction>;
  addPassword: (password: Omit<PasswordItem, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updatePassword: (password: PasswordItem) => Promise<void>;
  deletePassword: (id: string) => Promise<void>;
  filteredPasswords: PasswordItem[];
}

const PasswordContext = createContext<PasswordContextType | undefined>(undefined);

export const PasswordProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(passwordReducer, initialState);

  useEffect(() => {
    const init = async () => {
      const passwords = await loadPasswords();
      dispatch({ type: 'SET_PASSWORDS', payload: passwords });
      dispatch({ type: 'SET_LOADING', payload: false });
    };
    init();
  }, []);

  useEffect(() => {
    if (!state.loading) {
      savePasswords(state.passwords);
    }
  }, [state.passwords, state.loading]);

  const addPassword = async (passwordData: Omit<PasswordItem, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newPassword: PasswordItem = {
      ...passwordData,
      id: crypto.randomUUID(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    dispatch({ type: 'ADD_PASSWORD', payload: newPassword });
  };

  const updatePassword = async (password: PasswordItem) => {
    const updatedPassword = { ...password, updatedAt: Date.now() };
    dispatch({ type: 'UPDATE_PASSWORD', payload: updatedPassword });
  };

  const deletePassword = async (id: string) => {
    dispatch({ type: 'DELETE_PASSWORD', payload: id });
  };

  const filteredPasswords = state.passwords.filter(p =>
    p.platform.toLowerCase().includes(state.searchQuery.toLowerCase())
  );

  return (
    <PasswordContext.Provider
      value={{
        state,
        dispatch,
        addPassword,
        updatePassword,
        deletePassword,
        filteredPasswords,
      }}
    >
      {children}
    </PasswordContext.Provider>
  );
};

export const usePasswordContext = () => {
  const context = useContext(PasswordContext);
  if (context === undefined) {
    throw new Error('usePasswordContext must be used within a PasswordProvider');
  }
  return context;
};
