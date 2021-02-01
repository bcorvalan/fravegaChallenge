import React from "react";

function pokeDetails(props) {
  return (
    <div>
      <div className="pokemon__details_conteiner">
        <span>Altura</span> <span>{props.pokemon.height}m</span>
        <span>Peso</span> <span>{props.pokemon.weight}m</span>
        {props.pokemon.abilities.map((ability, i) => {
          return (
            <div key={i} id={i} className="card__pokemon__type">
              {ability.ability.name}
            </div>
          );
        })}
        {props.pokemon.moves.map((move, i) => {
          return (
            <div key={i} id={i} className="card__pokemon__type">
              {move.move.name}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default pokeDetails;
