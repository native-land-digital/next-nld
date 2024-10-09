'use client';
import { createContext } from 'react';

export const LocaleContext = createContext();

export function LocaleProvider({ children, messages }) {

  return (
    <LocaleContext.Provider value={{ messages }}>
      {children}
    </LocaleContext.Provider>
  );
}
