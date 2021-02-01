/*a sloppy solution to API call and pagination*/
export async function pokelist(page) {
  let pokemons = [];
  let dataDetails;

  const data = await fetch(
    "https://pokeapi.co/api/v2/pokemon/?limit=5&offset=" + page
  );
  const pokes = await data.json();

  for (let i = 0; i < pokes.results.length; i++) {
    dataDetails = await fetch(
      "https://pokeapi.co/api/v2/pokemon/" + pokes.results[i].name
    );
    const pokesDetails = await dataDetails.json();
    const pokemon = {
      name: pokes.results[i].name,
      id: pokesDetails.id,
      moves: pokesDetails.moves,
      images: pokesDetails.sprites,
      abilities: pokesDetails.abilities,
      types: pokesDetails.types
    };
    pokemons.push(pokemon);
  }
  return pokemons;
}


