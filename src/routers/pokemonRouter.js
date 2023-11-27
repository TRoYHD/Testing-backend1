import { Router } from 'express';
import pokemonController from "../controllers/pokemonController.js";
import  isAuthenticated from "../controllers/authController.js"
import {addedpokemons} from "../controllers/pokemonController.js"
import updateCache from "../controllers/pokemonController.js"
const router = Router();


router.get('/pokemon/:id?', pokemonController);
router.post('/create', isAuthenticated, (req, res) => {
    console.log(1);
    const newPokemon = req.body; // Assuming the new Pokémon's data is sent in the request body

    // Add the new Pokémon to your dataset
    addedpokemons.push(newPokemon);
    console.log(2);
    console.log(addedpokemons);

    // Update your cache with the new list
    // Assuming you have a function to update the cache
    updateCache();
    console.log(3);

    res.status(201).send('New Pokémon added');
});


export default router;