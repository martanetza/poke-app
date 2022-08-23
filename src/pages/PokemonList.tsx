import React, {useEffect, useState} from "react";
import { Container, Row, Col } from 'react-bootstrap';
import ItemsPerPageDropdown from "../components/ItemsPerPageDropdown";
import PokemonCard from "../components/PokemonCard";
import SortValueDropdown from "../components/SortValueDropdown";
 
interface Pokemon {
  id : number;
  sprites : {front_default : string};
  name : string;
  height : number;
  weight : number;
  abilities: {ability: {name: string}}[];
}

const PokemonList: React.FC = () => {
const [pokemons, setPokemons] = useState<Pokemon[]>([]);
const [sortedPokemons, setSortedPokemons] = useState<Pokemon[]>([]);
const [itemsPerPage, setItemsPerPage] = useState(8);
const [currentPage, setCurrentPage] = useState(1);
const [totalPageNumber, setTotalPageNumber] = useState(0);
const [offset, setOffset] = useState(0);
const [sortValue, setSortValue] = useState<string | null>(null);

useEffect(() => {
  fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${itemsPerPage}&offset=${offset}`)
    .then(response => response.json())
    .then(data => {
      const {count, results} = data;
      setTotalPageNumber(Math.ceil(count / itemsPerPage));
      const promisesArray = results.map((result: { url: string}) => fetch(result.url).then(response => response.json()));
      return Promise.all(promisesArray);
    }).then((data: Pokemon[]) => setPokemons(data));
}, [itemsPerPage, offset])

useEffect(() => {
  if (sortValue === 'name') {
    setSortedPokemons(pokemons.sort((a: Pokemon, b: Pokemon) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)))
  } else if (sortValue === 'height') {
    setSortedPokemons(pokemons.sort((a: Pokemon,b: Pokemon) => a.height - b.height));
  } else if (sortValue === 'weight') {
    setSortedPokemons(pokemons.sort((a: Pokemon,b: Pokemon) => a.weight - b.weight));
  } 
 }, [sortValue])

useEffect(() => {
   setPokemons([...sortedPokemons])
 }, [sortedPokemons])

useEffect(()=>{
  setOffset(itemsPerPage * (currentPage - 1))
}, [currentPage])

return (
  <>
    <Container fluid className="mb-5 pt-2 pb-4 header-wrap">
      <Container>
        <Row>
          <Col xs={3}>
            <ItemsPerPageDropdown itemsPerPage={itemsPerPage} setItemsPerPage={setItemsPerPage} />
          </Col>
          <Col xs={3}>
            <SortValueDropdown sortValue={sortValue} setSortValue={setSortValue} />
          </Col>
        </Row>
      </Container>
    </Container>
    <Container>
      <Row className="justify-content-center">
        <Col xs={6} className="d-flex justify-content-center align-items-center">
          <button type="button" className="btn border-0" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Previous page</button>
          <span>{`${currentPage} / ${totalPageNumber}`}</span>
          <button type="button" className="btn border-0"  disabled={currentPage === totalPageNumber} onClick={() => setCurrentPage(currentPage + 1)}>Next page</button>
        </Col>
      </Row>
      <Row>
        {pokemons &&
          pokemons.map((pokemon) => (
            <Col xs={6} md={4} lg={3} key={pokemon.id} className="mb-3">
              <PokemonCard id={pokemon.id} imgUrl={pokemon.sprites.front_default} name={pokemon.name} height={pokemon.height} weight={pokemon.weight} abilities={pokemon.abilities}/>
            </Col>
        ))}
      </Row>
    </Container>
  </>
)}

export default PokemonList