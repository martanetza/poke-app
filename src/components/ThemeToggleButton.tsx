import React, { useContext, useEffect } from "react";
import { ThemeContext } from '../context/themeContext';

const ThemeToggleButton: React.FC = () => {
  const themeContext = useContext(ThemeContext);

  useEffect(() => {
    if ( localStorage.getItem('themeMode') === 'dark-theme' ) {
      const switchButton: HTMLInputElement | null = document.querySelector('.switch input');
      if ( switchButton ) {
        switchButton.checked = true;
      }
    }
  }, []);

  const handleOnChange = (checked: boolean) => {
    if (checked) {
      themeContext?.setThemeMode('dark-theme');
      localStorage.setItem('themeMode', 'dark-theme');
    } else {
      themeContext?.setThemeMode('light-theme');
      localStorage.setItem('themeMode', 'light-theme');
    }
  }

  return (
    <div className="toggle-wrap d-flex justify-content center align-items-center">
      <p className="d-inline mb-0 me-3">Light mode</p>
      <label className="switch" htmlFor="checkbox">
        <input name="checkbox" onChange={(e) => handleOnChange(e.target.checked)} id="checkbox" type="checkbox" />    
        <div />
      </label>
      <p className="d-inline mb-0 ms-3">Dark mode</p>
    </div>
)}

export default ThemeToggleButton;