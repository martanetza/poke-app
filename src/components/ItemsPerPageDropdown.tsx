import React from "react";
import {Dropdown} from 'react-bootstrap';
 
interface Props {
  itemsPerPage : number;
  setItemsPerPage : React.Dispatch<React.SetStateAction<number>>
} 

const ItemsPerPageDropdown: React.FC<Props> = ({itemsPerPage, setItemsPerPage}) => {
const handleOnSelect = (e: string | null) => {
 setItemsPerPage(Number(e))
}

return (
  <Dropdown onSelect={(e) => handleOnSelect(e)}>
    <Dropdown.Toggle variant="primary" id="dropdown-basic">
      {`Showing ${itemsPerPage} items`}
    </Dropdown.Toggle>
    <Dropdown.Menu>
      <Dropdown.Item eventKey="8">8</Dropdown.Item>
      <Dropdown.Item eventKey="16">16</Dropdown.Item>
      <Dropdown.Item eventKey="32">32</Dropdown.Item>
      <Dropdown.Item eventKey="64">64</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
)}

export default ItemsPerPageDropdown;