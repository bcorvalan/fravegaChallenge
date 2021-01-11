import React from "react";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { faDragon, faCoffee } from "@fortawesome/free-solid-svg-icons";
//          <FontAwesomeIcon icon={faCoffee} />

function Card({ pokemon }) {
  return (
    <div className="card_contianer">
      <div className="Card__name">{pokemon.name}</div>
      <button>See More</button>
    </div>
  );
}

export default Card;
