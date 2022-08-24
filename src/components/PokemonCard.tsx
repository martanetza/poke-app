import React, {useEffect, useState} from "react";
import {Card, Col} from 'react-bootstrap';
import {Link, useNavigate} from 'react-router-dom';
  
interface Props {
  id : number;
  imgUrl : string;
  name : string;
  height : number;
  weight : number;
  abilities : {ability: {name: string}}[];
  setNewId?: React.Dispatch<React.SetStateAction<number | undefined>>
}

const PokemonCard: React.FC<Props> = ({id, imgUrl, name, height, weight, abilities, setNewId}) => (
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
      <Link 
	      to={`/pokemon/${id}`}
	      onClick={setNewId? () => {setNewId(id)} : undefined}
        >
        See Details
      </Link>
    </div>
  </Card>
)

export default PokemonCard