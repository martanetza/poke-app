import React, {useContext} from "react";
import { ThemeContext } from '../context/themeToggle';
 
interface Props {
  // itemsPerPage : number;
  // setItemsPerPage : React.Dispatch<React.SetStateAction<number>>
} 

const ThemeToggleButton: React.FC<Props> = () => {
  const themeContext = useContext(ThemeContext);

  const handleOnChange = (checked: boolean) => {
    if (checked) {
      themeContext?.setThemeMode('dark-theme')
    } else {
      themeContext?.setThemeMode('light-theme')
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