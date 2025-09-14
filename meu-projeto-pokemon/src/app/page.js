"use client";
import React, { useEffect, useState } from 'react';

export default function Home() {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    async function fetchPokemons() {
      
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20');
      const data = await response.json();

      
      const detailedPokemons = await Promise.all(
        data.results.map(async (pokemon) => {
          const res = await fetch(pokemon.url);
          const details = await res.json();
          return {
            id: details.id,
            name: details.name,
            image: details.sprites.front_default,
          };
        })
      );

      setPokemons(detailedPokemons);
    }

    fetchPokemons();
  }, []);

  return (
    <div>
      <h1>Lista de Pokémons</h1>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {pokemons.map((pokemon) => (
          <li key={pokemon.id} style={{ marginBottom: '20px' }}>
            <h2>
              #{String(pokemon.id).padStart(3, '0')} - {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
            </h2>
            <img src={pokemon.image} alt={pokemon.name} />
          </li>
        ))}
      </ul>
    </div>
  );
}
