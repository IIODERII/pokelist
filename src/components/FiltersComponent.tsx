import { useEffect, useState, type Dispatch, type SetStateAction } from "react"
import { capitalizeFirstLetter, type Filters } from "../interfaces"
import "./FiltersComponent.css"

function FiltersComponent({ setFilters, filters }: { setFilters: Dispatch<SetStateAction<Filters>>, filters: Filters }) {
    const [pokemonTypes, setPokemonTypes] = useState<{ name: string }[]>([]);

    const fetchTypes = async (): Promise<{ name: string }[]> => {
        const listRes = await fetch('https://pokeapi.co/api/v2/type/');
        const listData = await listRes.json();
        
        return listData.results.map(
            ({ name }: { name: string; url: string }) => ({ name })
        );
    };

    const handleSortName = () => {
        if (filters.sortOrder == 'ALPHABET_ASC') setFilters((prev) => ({ ...prev, sortOrder: 'NUM_DESC' }))
        else if ((filters.sortOrder == 'ALPHABET_DESC')) setFilters((prev) => ({ ...prev, sortOrder: 'ALPHABET_ASC' }))
        else setFilters((prev) => ({ ...prev, sortOrder: 'ALPHABET_DESC' }))
    }

    const handleSortNumber = () => {
        if (filters.sortOrder == 'NUM_ASC') setFilters((prev) => ({ ...prev, sortOrder: 'NUM_DESC' }))
        else if ((filters.sortOrder == 'NUM_DESC')) setFilters((prev) => ({ ...prev, sortOrder: 'NUM_ASC' }))
        else setFilters((prev) => ({ ...prev, sortOrder: 'NUM_DESC' }))
    }

    useEffect(() => {
        fetchTypes().then(setPokemonTypes);
    }, []);

    return (
        <div className="filters flex items-center justify-between mt-20 mb-10">
            <input placeholder="Search Pokémon name" className="border border-white p-2 rounded-md w-80 me-5" type="text" onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))} />
            <select className="border border-white p-2 rounded-md w-80" onChange={(e) => setFilters((prev) => ({ ...prev, selectedType: e.target.value }))}>
                <option value="">All Types</option>
                {pokemonTypes.map((type) => (
                    <option key={type.name} value={type.name}>
                        {capitalizeFirstLetter(type.name)}
                    </option>
                ))}
            </select>

            <div>
                <div>
                    <label>Order by</label>
                    <button
                        onClick={handleSortNumber}
                        className={`mx-5 bg-gray-700 border border-white p-2 rounded-md ${filters.sortOrder == "NUM_ASC" || filters.sortOrder == "NUM_DESC" ? "border-3" : ""}`}>
                        {filters.sortOrder != "NUM_DESC" ? "# Pokédex N° ▲" : "# Pokédex N° ▼"}
                    </button>
                    <button
                        onClick={handleSortName}
                        className={`bg-gray-700 border border-white p-2 rounded-md ${filters.sortOrder == "ALPHABET_DESC" || filters.sortOrder == "ALPHABET_ASC" ? "border-3" : ""}`}>
                        {filters.sortOrder != "ALPHABET_DESC" ? "A - Z Name ▲" : "Z - A Name ▼"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default FiltersComponent