import React from "react";
import {Dropdown} from 'react-bootstrap';
 
interface Props {
  sortValue : string | null;
  setSortValue : React.Dispatch<React.SetStateAction<string | null>>
} 

const SortValueDropdown: React.FC<Props> = ({sortValue, setSortValue}) => {
const handleOnSelect = (e: string | null) => {
  setSortValue(e)
}

return (
  <Dropdown onSelect={(e) => handleOnSelect(e)}>
    <Dropdown.Toggle variant="primary" id="dropdown-basic">
      { sortValue || "Sort items" }
    </Dropdown.Toggle>
    <Dropdown.Menu>
      <Dropdown.Item eventKey="name">name</Dropdown.Item>
      <Dropdown.Item eventKey="height">height</Dropdown.Item>
      <Dropdown.Item eventKey="weight">weight</Dropdown.Item>
     </Dropdown.Menu>
  </Dropdown>
)}

export default SortValueDropdown;