import React, { useEffect, useState } from "react";
import "./style/base.scss";
import { getPokemon, getAllPokemon } from "./services/pokeAPI";
import Hero from "./components/Hero";
import Card from "./components/Card";

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [nextUrl, setNextUrl] = useState("");
  const [prevUrl, setPrevUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const initialURL = "https://pokeapi.co/api/v2/pokemon/?limit=5";

  useEffect(() => {
    async function fetchData() {
      let response = await getAllPokemon(initialURL);
      setNextUrl(response.next);
      setPrevUrl(response.previous);
      setLoading(false);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      let response = await getAllPokemon(initialURL);
      setNextUrl(response.next);
      setPrevUrl(response.previous);
      await loadPokemon(response.results);
      setLoading(false);
    }
    fetchData();
  }, []);

  const incrementPokemons = async () => {
    setLoading(true);
    let data = await getAllPokemon(nextUrl);
    await loadPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  };

  const decrementPokemons = async () => {
    if (!prevUrl) return;
    setLoading(true);
    let data = await getAllPokemon(prevUrl);
    await loadPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  };

  const loadPokemon = async (data) => {
    let _pokemonData = await Promise.all(
      data.map(async (pokemon) => {
        let pokemonRecord = await getPokemon(pokemon);
        return pokemonRecord;
      })
    );
    setPokemonData(_pokemonData);
  };

  return (
    <div className="App">
      <Hero />
      {console.log(pokemonData)}
      <div className="card__conteiner">
        {pokemonData.map((pokemon, i) => {
          return <Card key={i} pokemon={pokemon} />;
        })}
      </div>
      <div id="outer-circle">
        <div id="inner-circle"></div>
      </div>
      <button onClick={incrementPokemons}>Show more</button>
      <button onClick={decrementPokemons}>Show less</button>
    </div>
  );
}

export default App;
