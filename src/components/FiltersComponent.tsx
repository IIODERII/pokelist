import type { Dispatch, SetStateAction } from "react"
import type { Filters } from "../interfaces"
import "./FiltersComponent.css"

function FiltersComponent({ setFilters, filters }: { setFilters: Dispatch<SetStateAction<Filters>>, filters: Filters }) {

    const handleSortName = () => {
        if(filters.sortOrder == 'ALPHABET_ASC') setFilters((prev) => ({ ...prev, sortOrder: '' }))
        else if((filters.sortOrder == 'ALPHABET_DESC')) setFilters((prev) => ({ ...prev, sortOrder: 'ALPHABET_ASC' }))
        else setFilters((prev) => ({ ...prev, sortOrder: 'ALPHABET_DESC' }))
    }

    return (
        <div className="filters flex items-center justify-between mt-20 mb-10">
            <input placeholder="Search Pokémon name" className="border border-white p-2 rounded-md w-80" type="text" onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))} />

            <div>
                <div>
                    <label>Order by</label>
                    <button 
                        onClick={handleSortName} 
                        className={`mx-5 bg-gray-700 border border-white p-2 rounded-md ${filters.sortOrder == "ALPHABET_DESC" || filters.sortOrder == "ALPHABET_ASC" ? "border-3" : ""}`}>
                            {filters.sortOrder != "ALPHABET_DESC" ? "A - Z Name ▲" : "Z - A Name ▼"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default FiltersComponent