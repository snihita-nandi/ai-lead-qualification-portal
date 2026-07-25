// Placeholder local storage hook
'use client';

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  return [initialValue, (_value: T) => { void key; }];
}
