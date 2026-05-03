import { useEffect, useState } from "react"
import type { Pokemon } from "../interfaces";

const fetchPokemons = async (): Promise<Pokemon[]> => {
    const listRes = await fetch('https://pokeapi.co/api/v2/pokemon?limit=50');
    const listData = await listRes.json();

    const pokemons = await Promise.all(
        listData.results.map((pokemon: { name: string, url: string }) =>
            fetch(pokemon.url)
                .then(res => res.json())
                .then(async data => (
                    {
                        id: data.id,
                        name: data.name,
                        types: await getTypesData(data.types),
                        imageUrl: data.sprites.front_default,
                        pokedexNumber: data.order
                    }
                ))
        )
    );

    return pokemons;
}

const getTypesData = async (types: {slot: number, type: { name: string, url: string }}[]): Promise<{ name: string, iconUrl: string }[]> => {
    return await Promise.all(
        types.map((type: {slot: number, type: { name: string, url: string }}) =>
            fetch(type.type.url)
                .then(res => res.json())
                .then(t => (
                    {
                        name: t.name,
                        iconUrl: t.sprites["generation-viii"]?.["brilliant-diamond-shining-pearl"].symbol_icon || ""
                    }
                ))
        )
    )
}

function CardList() {
    const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);

    useEffect(() => {
        fetchPokemons().then(setPokemonList);
    }, []);

    return (
        <div className="mt-10">
            {pokemonList.map((pokemon) => (
                <div key={pokemon.id}>
                    <img src={pokemon.imageUrl} alt="" />
                    <div>{pokemon.name} - {pokemon.types.map((type) => (<div key={type.name}><img src={type.iconUrl} alt="" />{type.name}</div>))}</div>
                </div>
            ))}
        </div>
    )
}

export default CardList