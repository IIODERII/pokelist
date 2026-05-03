import { useEffect, useState } from "react"
import type { Filters, Pokemon } from "../interfaces";
import Card from "./Card";
import FiltersComponent from "./FiltersComponent";

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
                    }
                ))
        )
    );

    return pokemons;
}

const getTypesData = async (types: { slot: number, type: { name: string, url: string } }[]): Promise<{ name: string, iconUrl: string }[]> => {
    return await Promise.all(
        types.map((type: { slot: number, type: { name: string, url: string } }) =>
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
    const [filters, setFilters] = useState<Filters>({ search: '', selectedType: '', sortOrder: 'NUM_DESC' });

    const filterElements = (pokemon: Pokemon) => {
        if (pokemon.name.toLowerCase().includes(filters.search.toLowerCase())) {
            if(filters.selectedType == "") return true;

            if(pokemon.types.some(x => x.name.toLowerCase() == filters.selectedType.toLowerCase())) return true;

            return false;
        }
        return false;
    }

    const sortElements = (a: Pokemon, b: Pokemon) => {
        if (filters.sortOrder == 'ALPHABET_DESC') {
            if (a.name < b.name) {
                return -1;
            }
            if (a.name > b.name) {
                return 1;
            }
        } else if (filters.sortOrder == 'ALPHABET_ASC') {
            if (a.name < b.name) {
                return 1;
            }
            if (a.name > b.name) {
                return -1;
            }
        }else if (filters.sortOrder == 'NUM_DESC') {
            if (a.id < b.id) {
                return -1;
            }
            if (a.id > b.id) {
                return 1;
            }
        } else if (filters.sortOrder == 'NUM_ASC') {
            if (a.id < b.id) {
                return 1;
            }
            if (a.id > b.id) {
                return -1;
            }
        }
        return 0;
    }

    useEffect(() => {
        fetchPokemons().then(setPokemonList);
    }, []);
    useEffect(() => {
    }, [filters]);

    return (
        <>
            <FiltersComponent setFilters={setFilters} filters={filters} />
            <div className="grid grid-cols-5 gap-10 mt-10">
                {pokemonList
                    .filter((pokemon) => filterElements(pokemon))
                    .sort((a, b) => sortElements(a, b))
                    .map((pokemon) => (
                        <Card key={pokemon.id} pokemon={pokemon} />
                    ))}
            </div>
        </>
    )
}

export default CardList