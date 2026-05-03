import { capitalizeFirstLetter, type Pokemon } from "../interfaces";
import "./Card.css";

function Card({ pokemon }: { pokemon: Pokemon }) {
    return (
        <div className="card border border-white rounded-xl p-5">
            <div className="img-container p-2 bg-gray-700 rounded-xl">
                <img className="w-full" src={pokemon.imageUrl} alt={pokemon.name} />
            </div>

            <div className="info-container mt-5">
                <div className="text-center text-2xl">{capitalizeFirstLetter(pokemon.name)}</div>
                <div className="text-center text-gray-400">#{pokemon.id.toString().padStart(4, "0")}</div>

                <div className="flex justify-center gap-3 mt-6">
                    {pokemon.types.map((type) => (
                        <div className="types" key={type.name}>
                            <img className="w-full" src={type.iconUrl} alt={type.name} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Card