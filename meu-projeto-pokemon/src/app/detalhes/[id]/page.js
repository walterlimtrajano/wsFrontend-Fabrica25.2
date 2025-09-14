import React from "react";

async function getPokemon(id) {
  const cleanId = String(parseInt(id, 10));
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${cleanId}`);
  if (!res.ok) throw new Error("Erro ao buscar Pokémon");
  return res.json();
}


export default async function PokemonDetalhes({ params }) {
  const { id } = params;
  const data = await getPokemon(id);

  const tipos = data.types.map((typeInfo) => typeInfo.type.name);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4 capitalize">
        #{String(data.id).padStart(3, "0")} - {data.name}
      </h1>

      <img
        src={data.sprites.front_default}
        alt={data.name}
        className="mb-4 w-32 h-32"
      />

      <ul className="text-lg space-y-2">
        <li><strong>Tipo(s):</strong> {tipos.join(", ")}</li>
        <li><strong>Peso:</strong> {data.weight / 10} kg</li>
        <li><strong>Experiência Base:</strong> {data.base_experience}</li>
      </ul>

      <a href="/" className="inline-block mt-6 text-blue-600 underline">
        ← Voltar para a lista
      </a>
    </div>
  );
}
