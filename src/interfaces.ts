export interface Pokemon{
    id: number,
    name: string,
    types: {name: string, iconUrl: string}[],
    imageUrl: string,
    pokedexNumber: number
}