/* eslint-disable no-unused-expressions */
import React, { useEffect, useState, useContext } from "react";
import { Container, Row, Col, Accordion } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import PokemonCard from "../components/PokemonCard";
import { ThemeContext } from '../context/themeContext';
 
interface Pokemon {
  id : number;
  sprites : {front_default : string};
  name : string;
  height : number;
  weight : number;
  base_experience : number;
  is_default : boolean;
  order : number;
  species : {name : string};
  abilities: {ability: {name: string}}[];
  forms: {name: string}[];
  types: {type: {name: string}}[];
  game_indices: {version: {name: string}}[];
  stats: {stat: {name: string}}[];
  moves: {move: {name: string}}[];
}

const SinglePokemonPage: React.FC = () => {
  const themeContext = useContext(ThemeContext);
  const [pokemon, setPokemon] = useState<Pokemon>()
  const [pokemons, setPokemons] = useState<Pokemon[]>()
  const [newId, setNewId] = useState<number>();
  const { id } = useParams();

  useEffect(() => {
    setNewId(Number(id))
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch(`https://pokeapi.co/api/v2/pokemon/${newId}`)
    .then(response => response.json())
    .then(data => {
      setPokemon(data)
    });
}, [newId]);

  useEffect(() => {
    const offset = Math.floor(Math.random() * 1000);
    fetch(`https://pokeapi.co/api/v2/pokemon/?limit=3&offset=${offset}`)
    .then(response => response.json())
    .then(data => {
      const {results} = data;
      const promisesArray = results.map((result: { url: string}) => fetch(result.url).then(response => response.json()));
      return Promise.all(promisesArray);
    }).then((data: Pokemon[]) => setPokemons(data));
  }, [pokemon]);

  return (
    <Container fluid className={`pb-5 single-pokemon-page ${themeContext ? themeContext.themeMode : ''}`}>
      {pokemon &&
        <Container>
          <Row className="position-relative">
              <a href="#/" className="btn back-btn">Back</a>          
              <img className="front-img" src={pokemon.sprites.front_default} alt="" />
           </Row>
          <Row>
            <h1>{pokemon.name}</h1>
          </Row>
          <Row className="justify-content-center columns-wrap">
            <Col>
              Height: {pokemon.height}
            </Col>
            <Col>
              Weight: {pokemon.weight}
            </Col>
            <Col>
              Base experience: {pokemon.base_experience}
            </Col>
            <Col>
              Default: {String(pokemon.is_default)}
            </Col>
            <Col>
              Species: {pokemon.species.name}
            </Col>
          </Row>
          <Row>
          <Accordion defaultActiveKey={['0']} alwaysOpen>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Abilities</Accordion.Header>
              <Accordion.Body>
                <ul className="list-unstyled">
                  {pokemon.abilities.map((ability) => (
                    <li key={ability.ability.name}>{ability.ability.name}</li>
                  ))}
                </ul>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Forms</Accordion.Header>
              <Accordion.Body>
                <ul className="list-unstyled">
                  {pokemon.forms.map((form) => (
                    <li key={form.name}>{form.name}</li>
                  ))}
                </ul>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>Types</Accordion.Header>
              <Accordion.Body>
                <ul className="list-unstyled">
                  {pokemon.types.map((type) => (
                    <li key={type.type.name}>{type.type.name}</li>
                  ))}
                </ul>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
              <Accordion.Header>Game Indices</Accordion.Header>
              <Accordion.Body>
                <ul className="list-unstyled">
                  {pokemon.game_indices.map((item) => (
                    <li key={item.version.name}>{item.version.name}</li>
                  ))}
                </ul>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="4">
              <Accordion.Header>Stats</Accordion.Header>
              <Accordion.Body>
                <ul className="list-unstyled">
                  {pokemon.stats.map((state) => (
                    <li key={state.stat.name}>{state.stat.name}</li>
                  ))}
                </ul>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="5">
              <Accordion.Header>Moves</Accordion.Header>
              <Accordion.Body>
                <ul className="list-unstyled">
                  {pokemon.moves.map((move) => (
                    <li key={move.move.name}>{move.move.name}</li>
                  ))}
                </ul>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          </Row>
          <Row>
            <h2 className="relevant-items-header">You may also like</h2>
          </Row>
          <Row className="justify-content-center">
            {pokemons &&
              pokemons.map((pokemon) => (
                <Col xs={6} md={4} lg={3} key={pokemon.id} className="mb-3">
                  <PokemonCard id={pokemon.id} imgUrl={pokemon.sprites.front_default} name={pokemon.name} height={pokemon.height} weight={pokemon.weight} abilities={pokemon.abilities} setNewId={setNewId}/>
                </Col>
            ))}
          </Row>
        </Container>
      }
      </Container>
  )
}

export default SinglePokemonPage