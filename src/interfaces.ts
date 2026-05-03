export interface Pokemon {
    id: number,
    name: string,
    types: { name: string, iconUrl: string }[],
    imageUrl: string,
}

export interface Filters {
    search: string,
    sortOrder: ESortOrders
}

export type ESortOrders = 'ALPHABET_ASC' | 'ALPHABET_DESC' | "";

export function capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}