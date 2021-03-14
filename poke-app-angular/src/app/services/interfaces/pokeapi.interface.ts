export interface PokeApi {
    id: number;
    species: {
        name: string
    },
    sprites: {
        front_default: string
    }
    stats: [
        {
           base_stat: number;
           stat: {
               name: string;
           }
        }
    ],
    types: [
        {
            slot: number;
            type: {
                name: string;
            }
        }
    ],
}

export interface PokeApiList {
    count: number;
    next: string;
    previous: string;
    results:[
        {
            name: string;
            url: string
        }
    ]
}

export interface PokeApiDescription {
    flavor_text_entries: [
        {
            flavor_text: string;
            language: {
                name: string;
            }
            version: {
                name: string;
            }
        }
    ]
}