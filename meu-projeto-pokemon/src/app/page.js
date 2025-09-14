// app/page.jsx

async function getPokemon() {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10')

  if (!res.ok) {
    throw new Error('Falha ao buscar dados da PokéAPI')
  }

  return res.json()
}

export default async function HomePage() {
  const data = await getPokemon()
  const pokemons = data.results

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Lista de Pokémons</h1>
      <ul>
        {pokemons.map((pokemon, index) => (
          <li key={index}>
            <a href={pokemon.url} target="_blank" rel="noopener noreferrer">
              {pokemon.name}
            </a>
          </li>
        ))}
      </ul>
    </main>
  )
}
