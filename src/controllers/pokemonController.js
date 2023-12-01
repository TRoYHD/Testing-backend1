import pokemonService from "../services/pokemonService.js"

let cachedData = [];
let lastFetchTime = null;
export let addedpokemons = []

export const getAllPokemon = async (req, res) => {
    const now = new Date();
    let page = parseInt(req.query.page) || 1;
    const sortOrder = req.query.sortorder; // Accesses 'sortOrder' query parameter
    const search = req.query.search;
    // const limit = req.query.limit

    if (!lastFetchTime || now - lastFetchTime > 24 * 60 * 60 * 1000) { // 24 hours // 60*1000 1 min
        console.log("Fetching Data");

        try {
            // Fetch new data and update the cache
            cachedData = await pokemonService.getPokemonData();
            lastFetchTime = now;
            updateCache()
        } catch (error) {
            console.error('Error in Pokemon controller:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    
    res.json(paginateData(sortPokemonsByName(searchPokemons(cachedData ,search),sortOrder),page,25));
};
    
    function sortPokemonsByName(pokemons, sortOrder = 'asc') {
    return pokemons.sort((a, b) => {
        try{
            let nameA = a.name && typeof a.name === 'string' ? a.name.toLowerCase() : '';
            let nameB = b.name && typeof b.name === 'string' ? b.name.toLowerCase() : '';


            if (nameA < nameB) {
                return sortOrder === 'asc' ? -1 : 1;
            }
            if (nameA > nameB) {
                return sortOrder === 'desc' ? -1 : 1;
            }
        }
        catch (error){
            console.log(error)
        }
        // Normalize names to lowercase for case-insensitive comparison


        
        return 0;
    });
}

function paginateData(data, page, limit = 25) {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    return data.slice(startIndex, endIndex);
}

function searchPokemons(pokemons, searchString) {
    if (!searchString) {
        return pokemons;
    }

    return pokemons.filter(pokemon => 
        pokemon.name.toLowerCase().includes(searchString.toLowerCase())
    );
}
export function updateCache() {
    const flattened = addedpokemons.flat(2); // Adjust the depth level as needed

    try {
        const validAddedPokemons = flattened.filter(pokemon =>
            pokemon && typeof pokemon === 'object' && 'name' in pokemon
        );
        cachedData = [...cachedData, ...validAddedPokemons];
    } catch (error) {
        console.log(error);
    }
}


