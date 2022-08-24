import React, {useEffect, useState, useContext} from "react";
import { Container, Row, Col } from 'react-bootstrap';
import ItemsPerPageDropdown from "../components/ItemsPerPageDropdown";
import PokemonCard from "../components/PokemonCard";
import SearchFrom from "../components/SearchForm";
import SortValueDropdown from "../components/SortValueDropdown";
import ThemeToggleButton from "../components/ThemeToggleButton"
import {ThemeContext} from '../context/themeContext';

 
interface Pokemon {
  id : number;
  sprites : {front_default : string};
  name : string;
  height : number;
  weight : number;
  abilities: {ability: {name: string}}[];
}

const PokemonList: React.FC = () => {
const themeContext = useContext(ThemeContext);
const [pokemons, setPokemons] = useState<Pokemon[]>([]);
const [filtredPokemons, setFiltredPokemons] = useState<Pokemon[]>([]);
const [itemsPerPage, setItemsPerPage] = useState(8);
const [currentPage, setCurrentPage] = useState(1);
const [totalPageNumber, setTotalPageNumber] = useState(0);
const [offset, setOffset] = useState(0);
const [sortValue, setSortValue] = useState<string | null>(null);
const [searchValue, setSearchValue] = useState<string>('');
const [pokemonsReady, setPokemonsReady] = useState(false);

useEffect(() => {
  if (localStorage.getItem('sortValue')) {
    setSortValue(localStorage.getItem('sortValue'))
  }
}, [])

useEffect(() => {
  if (filtredPokemons.length === 0 || !searchValue) {
    fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${itemsPerPage}&offset=${offset}`)
    .then(response => response.json())
    .then(data => {
      const {count, results} = data;
      setTotalPageNumber(Math.ceil(count / itemsPerPage));
      const promisesArray = results.map((result: { url: string}) => fetch(result.url).then(response => response.json()));
      return Promise.all(promisesArray);
    }).then((data: Pokemon[]) => {
      setPokemons(data);
      setPokemonsReady(true);
    });
  } else {
    setPokemons(filtredPokemons);
  }
}, [itemsPerPage, offset, filtredPokemons, searchValue])

useEffect(() => {
  if(pokemonsReady) {
    if (sortValue) {
      localStorage.setItem('sortValue', sortValue);
    }
    if (sortValue === 'name') {
      setPokemons([...pokemons.sort((a: Pokemon, b: Pokemon) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))])
    } else if (sortValue === 'height') {
      setPokemons([...pokemons.sort((a: Pokemon, b: Pokemon) => a.height - b.height)]);
    } else if (sortValue === 'weight') {
      setPokemons([...pokemons.sort((a: Pokemon, b: Pokemon) => a.weight - b.weight)]);
    }
  } 
}, [sortValue, pokemonsReady])

useEffect(() => {
    const filtred = [...pokemons.filter((el) => el.name.includes(searchValue))]
    if (filtred.length > 0) {
      localStorage.setItem('filtredPokemons', JSON.stringify(filtred));
      setFiltredPokemons(filtred)
    } else {
      setFiltredPokemons([])
    }
 }, [searchValue])

useEffect(() => {
  setOffset(itemsPerPage * (currentPage - 1))
}, [currentPage])

return (
  <div className={`${themeContext ? themeContext.themeMode : ''}`}>
    <Container fluid className="mb-5 pt-2 pb-4 header-wrap">
      <Container>
        <Row>
          <Col xs={3}>
            <ItemsPerPageDropdown itemsPerPage={itemsPerPage} setItemsPerPage={setItemsPerPage} />
          </Col>
          <Col xs={6}>
            <SearchFrom searchValue={searchValue} setSearchValue={setSearchValue} />
          </Col>
          <Col xs={3}>
            <SortValueDropdown sortValue={sortValue} setSortValue={setSortValue} />
          </Col>
        </Row>
      </Container>
    </Container>
    <Container>
      <Row className="justify-content-center position-relative mb-5">
      <ThemeToggleButton />
        <Col xs={6} className="d-flex justify-content-center align-items-center">
          <button type="button" className="btn border-0" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Previous page</button>
          <span>{`${currentPage} / ${totalPageNumber}`}</span>
          <button type="button" className="btn border-0"  disabled={currentPage === totalPageNumber} onClick={() => setCurrentPage(currentPage + 1)}>Next page</button>
        </Col>
      </Row>
      <Row>
        {pokemons &&
          pokemons.map((pokemon) => (
            <Col xs={6} md={4} lg={3} key={pokemon.id} className="mb-3 custom-padding">
              <PokemonCard id={pokemon.id} imgUrl={pokemon.sprites.front_default} name={pokemon.name} height={pokemon.height} weight={pokemon.weight} abilities={pokemon.abilities}/>
            </Col>
        ))}
      </Row>
    </Container>
  </div>
)}

export default PokemonList