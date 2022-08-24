/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useEffect, useRef, useState, createContext } from 'react';
 
export const FavouriteImages = createContext(null);

interface Props {
  children: React.ReactNode
}

type ThemeContextType = {
  themeMode: String | null
  setThemeMode: React.Dispatch<React.SetStateAction<string | null>>
} 

export const ThemeContext = createContext<ThemeContextType | null>(null);


export const ThemeProvider: React.FC<Props> = ({ children }) => {
  const [themeMode, setThemeMode]= useState<string | null>('light-theme');

  useEffect(() => {
    if ( localStorage.getItem('themeMode') ) {
      setThemeMode(localStorage.getItem('themeMode'));
    }
  }, []);

  return (
    <ThemeContext.Provider value={{themeMode, setThemeMode}}>
      {children}
    </ThemeContext.Provider>
  );
}