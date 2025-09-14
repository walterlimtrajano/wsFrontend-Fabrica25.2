import Header from './components/Header'
import Footer from './components/Footer'

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
    <>
      <Header />
      <main className="p-8 pb-20">
        <h1 className="text-3xl font-bold mb-6">Lista de Pokémons</h1>
        <ul className="space-y-2">
          {pokemons.map((pokemon, index) => (
            <li key={index}>
              <a
                href={pokemon.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:underline"
              >
                {pokemon.name}
              </a>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </>
  )
}
