import React, {useEffect, useState} from "react";
import {Card, Col} from 'react-bootstrap';
 
interface Props {
  id : number;
  imgUrl : string;
  name : string;
  height : number;
  weight : number;
  abilities : {ability: {name: string}}[];
}

const PokemonCard: React.FC<Props> = ({id,imgUrl, name, height, weight, abilities}) => (
  <Card>  
    <img src={imgUrl} alt="" />
    <h3 className="text-uppercase text-center">{name}</h3>
    <p className="d-flex justify-content-between"><strong>Height:</strong> <span>{height}</span></p>
    <p className="d-flex justify-content-between"><strong>Weight:</strong> <span>{weight}</span></p>
    <div className="d-flex justify-content-between"><strong>Abilities:</strong> 
      <span>
        <ul className="list-unstyled">
        {abilities.map((ability) => (
          <li key={ability.ability.name} className="text-end">{ability.ability.name}</li>
        ))}
        </ul>
      </span>
    </div>
    <div className="anchor-wrap">
      <a href={`/pokemon/${id}`}>See Details</a>
    </div>
  </Card>
)

export default PokemonCard