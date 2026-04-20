import { PasswordItem } from '../types';
import { encryptObject, decryptObject } from './crypto';

const STORAGE_KEY = 'passwords_data';

export const savePasswords = async (passwords: PasswordItem[]): Promise<void> => {
  const encrypted = encryptObject(passwords);
  if (window.electronAPI) {
    await window.electronAPI.storeSet(STORAGE_KEY, encrypted);
  } else {
    // Fallback to localStorage for demo purposes
    localStorage.setItem(STORAGE_KEY, encrypted);
  }
};

export const loadPasswords = async (): Promise<PasswordItem[]> => {
  try {
    let encrypted: string | null = null;
    if (window.electronAPI) {
      encrypted = await window.electronAPI.storeGet(STORAGE_KEY);
    } else {
      // Fallback to localStorage for demo purposes
      encrypted = localStorage.getItem(STORAGE_KEY);
    }
    if (!encrypted) return [];
    return decryptObject(encrypted);
  } catch (error) {
    console.error('Failed to load passwords:', error);
    return [];
  }
};
