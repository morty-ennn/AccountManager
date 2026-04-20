export interface PasswordItem {
  id: string;
  platform: string;
  username: string;
  password: string;
  email?: string;
  phone?: string;
  secondPassword?: string;
  notes?: string;
  customFields?: {
    [key: string]: string;
  };
  createdAt: number;
  updatedAt: number;
}

export interface PasswordState {
  passwords: PasswordItem[];
  searchQuery: string;
  loading: boolean;
}

export type PasswordAction =
  | { type: 'SET_PASSWORDS'; payload: PasswordItem[] }
  | { type: 'ADD_PASSWORD'; payload: PasswordItem }
  | { type: 'UPDATE_PASSWORD'; payload: PasswordItem }
  | { type: 'DELETE_PASSWORD'; payload: string }
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean };

export interface ElectronAPI {
  storeGet: (key: string) => Promise<any>;
  storeSet: (key: string, value: any) => Promise<boolean>;
  storeDelete: (key: string) => Promise<boolean>;
}

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}
