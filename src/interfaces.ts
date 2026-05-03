export interface Pokemon{
    id: number,
    name: string,
    types: {name: string, iconUrl: string}[],
    imageUrl: string,
    pokedexNumber: number
}

export function capitalizeFirstLetter(str: string): string{
    return str.charAt(0).toUpperCase() + str.slice(1);
}