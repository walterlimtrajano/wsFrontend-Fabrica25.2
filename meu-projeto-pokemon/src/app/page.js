"use client";

import React, { useEffect, useState } from "react";

export default function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchPokemons() {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
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
      setFiltered(detailedPokemons);
    }

    fetchPokemons();
  }, []);

  useEffect(() => {
    const results = pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFiltered(results);
  }, [searchTerm, pokemons]);

  const handleSearch = (e) => {
    e.preventDefault();
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Lista de Pokémons</h1>

      <form onSubmit={handleSearch} className="mb-6">
        <input
          type="text"
          placeholder="Buscar Pokémon..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 p-2 rounded mr-2"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Buscar
        </button>
      </form>

      {filtered.length === 0 ? (
        <p className="text-red-600">Nenhum Pokémon encontrado.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {filtered.map((pokemon) => (
            <li key={pokemon.id} className="mb-6">
              <h2 className="text-xl font-semibold">
                #{String(pokemon.id).padStart(3, "0")} -{" "}
                {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
              </h2>
              <img src={pokemon.image} alt={pokemon.name} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
