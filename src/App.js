import React, { useEffect, useState } from "react";
import "./App.scss";
import { getPokemon, getAllPokemon } from "./services/pokeAPI";
import Hero from "./components/Hero";
import Card from "./components/Card";

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  //const [page, setPage] = useState(1);
  const [nextUrl, setNextUrl] = useState("");
  const [prevUrl, setPrevUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const initialURL = "https://pokeapi.co/api/v2/pokemon/?limit=5" 

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
      let response = await getAllPokemon(initialURL)
      setNextUrl(response.next);
      setPrevUrl(response.previous);
      await loadPokemon(response.results);
      setLoading(false);
    }
    fetchData();
  }, [])

  const incrementPokemons = async () => {
    setLoading(true);
    let data = await getAllPokemon(nextUrl);
    await loadPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  }

  const decrementPokemons = async () => {
    if (!prevUrl) return;
    setLoading(true);
    let data = await getAllPokemon(prevUrl);
    await loadPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  }

  const loadPokemon = async (data) => {
    let _pokemonData = await Promise.all(data.map(async pokemon => {
      let pokemonRecord = await getPokemon(pokemon)
      return pokemonRecord
    }))
    setPokemonData(_pokemonData);
  }


  return (
    <div className="App">
      <Hero />
      {pokemonData.map((pokemon, i) => {
        return <Card key={i} pokemon={pokemon} />
              })}
      <button onClick={incrementPokemons}>ADD 5</button>
      <button onClick={decrementPokemons}>Remove 5</button>
    </div>
  );
}

export default App;
