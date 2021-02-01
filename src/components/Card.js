import React from "react";
import PokeDetails from "react"
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { faDragon, faCoffee } from "@fortawesome/free-solid-svg-icons";
//          <FontAwesomeIcon icon={faCoffee} />

function Card({ pokemon }) {
  return (
    <div className={`card__content ${pokemon.types[0].type.name}`}>
      <div className="card__pokemon">
        <div className="card__pokemon_img-conteiner">
          <img
            className="card__pokemon_img"
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
          />
        </div>
        <div className="card__pokemon_content">
          <div className="card__pokemon__name">
            <span>{pokemon.name}</span>
          </div>
          <div className="card__pokemon__id">
            <span>PokeId{pokemon.id}</span>
          </div>
          <div className="card__pokemon__types">
            {pokemon.types.map((type, i) => {
              return (
                <div key={i} id={i} className="card__pokemon__type">
                  {type.type.name}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="card__pokemon_buttons">
        <button className="card__pokemon_button">
          <span>Show More</span>
        </button>
      </div>
    <PokeDetails pokemon={pokemon}/>
    </div>
  );
}

export default Card;
