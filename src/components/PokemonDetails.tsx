import { useEffect, useState } from "react";
import { capitalizeFirstLetter, type Pokemon } from "../interfaces";
import { Link, useLocation } from "react-router-dom";

function PokemonDetails() {
    const [pokemonDetail, setPokemonDetail] = useState<Pokemon | null>(null);

    const location = useLocation();

    const fetchPokemonDetail = async (): Promise<Pokemon> => {
        const detailres = await fetch(`https://pokeapi.co/api/v2/pokemon${location.pathname}`);
        const data = await detailres.json();

        return {
            id: data.id,
            name: data.name,
            imageUrl: data.sprites.front_default,
            types: await getTypesData(data.types),
        }
    }

    const getTypesData = async (types: { slot: number, type: { name: string, url: string } }[]): Promise<{ name: string, iconUrl: string }[]> => {
        return await Promise.all(
            types.map((type: { slot: number, type: { name: string, url: string } }) =>
                fetch(type.type.url)
                    .then(res => res.json())
                    .then(t => (
                        {
                            name: t.name,
                            iconUrl: t.sprites["generation-viii"]?.["brilliant-diamond-shining-pearl"].name_icon || ""
                        }
                    ))
            )
        )
    }

    useEffect(() => {
        fetchPokemonDetail().then(setPokemonDetail);
    }, []);

    return (
        <div className='container mx-auto py-10 px-10 mt-10 border border-white rounded-xl backdrop-blur-sm'>
            <Link to={"/"}>
                <button
                    className="mx-5 bg-gray-700 border border-white p-2 rounded-md cursor-pointer">
                    Back to the list
                </button>
            </Link>
            
            <h1 className='text-center text-5xl font-bold mb-10'>
                {capitalizeFirstLetter(pokemonDetail?.name)}
                <div className="text-center text-gray-400 mt-1">#{pokemonDetail?.id.toString().padStart(4, "0")}</div>
            </h1>

            <div className="mx-auto img-container p-2 w-1/4 bg-gray-700 rounded-xl">
                <img className="w-full" src={pokemonDetail?.imageUrl} alt={pokemonDetail?.name} />

                <div className="mx-auto p-2 w-full flex justify-center gap-3 bg-gray-700 rounded-xl">
                    {pokemonDetail?.types.map((type) => (
                        <div className="types" key={type.name}>
                            <img className="w-full" src={type.iconUrl} alt={type.name} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default PokemonDetails