import { PasswordItem } from '../types';
import { encryptObject, decryptObject } from './crypto';

const STORAGE_KEY = 'passwords_data';

export const savePasswords = async (passwords: PasswordItem[]): Promise<void> => {
  const encrypted = encryptObject(passwords);
  await window.electronAPI.storeSet(STORAGE_KEY, encrypted);
};

export const loadPasswords = async (): Promise<PasswordItem[]> => {
  try {
    const encrypted = await window.electronAPI.storeGet(STORAGE_KEY);
    if (!encrypted) return [];
    return decryptObject(encrypted);
  } catch (error) {
    console.error('Failed to load passwords:', error);
    return [];
  }
};
