import React from "react";
import {Form} from 'react-bootstrap';
 
interface Props {
  searchValue : string;
  setSearchValue : React.Dispatch<React.SetStateAction<string>>
} 

const SearchFrom: React.FC<Props> = ({searchValue, setSearchValue}) => {
const handleOnChange = (e: string) => {
  setSearchValue(e);
}

return (
  <Form>
    <Form.Group className="mb-3" controlId="searchInput">
      <Form.Control onChange={(e) => handleOnChange(e.target.value)} type="text" placeholder="Enter pokemon name" />
    </Form.Group>
  </Form>
)}

export default SearchFrom;