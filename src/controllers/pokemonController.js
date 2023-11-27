import pokemonService from "../services/pokemonService.js"

let cachedData = null;
let lastFetchTime = null;
export let addedpokemons = []

const getAllPokemon = async (req, res) => {
    const now = new Date();

    const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
    const sortOrder = req.query.sortorder; // Accesses 'sortOrder' query parameter
    const search = req.query.search;
    const limit = req.query.limit

          console.log(sortOrder);
    // Check if data needs refreshing
    if (!lastFetchTime || now - lastFetchTime > 24 * 60 * 60 * 1000) { // 24 hours
        console.log("Fetching Data");

        try {
            // Fetch new data and update the cache
            cachedData = await pokemonService.getPokemonData();
            lastFetchTime = now;
        } catch (error) {
            console.error('Error in Pokemon controller:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    } // Return the cached data

   
    
    res.json(paginateData(sortPokemonsByName(searchPokemons(cachedData ,search),sortOrder),page,limit));
};
    
    function sortPokemonsByName(pokemons, sortOrder = 'asc') {
    return pokemons.sort((a, b) => {
        // Normalize names to lowercase for case-insensitive comparison
        let nameA = a.name.toLowerCase();
        let nameB = b.name.toLowerCase();

        if (nameA < nameB) {
            return sortOrder === 'asc' ? -1 : 1;
        }
        if (nameA > nameB) {
            return sortOrder === 'desc' ? -1 : 1;
        }

        
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
    console.log(addedpokemons);
     cachedData = [...cachedData, ...addedpokemons]
}

export function addPokemon (req, res){
    console.log(1);
    const newPokemon = req.body; // Assuming the new Pokémon's data is sent in the request body
    console.log(2);
    // Add the new Pokémon to your dataset
    addedpokemons.push(newPokemon);
    ;

    // Update your cache with the new list
    // Assuming you have a function to update the cache
    updateCache(pokemons);
    

    res.status(201).send('New Pokémon added');     

  }

export default getAllPokemon;