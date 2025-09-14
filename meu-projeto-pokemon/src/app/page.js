"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid");

  useEffect(() => {
    async function fetchPokemons() {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10277");
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

  const toggleViewMode = () => {
    setViewMode(viewMode === "grid" ? "list" : "grid");
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Lista de Pokémons</h1>

      <form onSubmit={handleSearch} className="mb-4">
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

      <button
        onClick={toggleViewMode}
        className="mb-6 bg-gray-700 text-white px-4 py-2 rounded"
      >
        Alternar Visualização ({viewMode === "grid" ? "Grade" : "Lista"})
      </button>

      {filtered.length === 0 ? (
        <p className="text-red-600">Nenhum Pokémon encontrado.</p>
      ) : (
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6"
              : "flex flex-col gap-6"
          }
        >
          {filtered.map((pokemon) => (
            <Link
              href={`/detalhes/${String(pokemon.id).padStart(3, "0")}`}
              key={pokemon.id}
              className="border p-4 rounded shadow-md text-center bg-white hover:bg-gray-100 transition"
            >
              <h2 className="text-xl font-semibold mb-2">
                #{String(pokemon.id).padStart(3, "0")} -{" "}
                {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
              </h2>
              <img
                src={pokemon.image}
                alt={pokemon.name}
                className="mx-auto w-24 h-24"
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
