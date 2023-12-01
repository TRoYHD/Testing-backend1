import { Router } from 'express';
import {getAllPokemon} from "../controllers/pokemonController.js";
import  isAuthenticated from "../controllers/authController.js"
import {addedpokemons} from "../controllers/pokemonController.js"
import {updateCache} from "../controllers/pokemonController.js"
const router = Router();


router.post('/create', isAuthenticated, (req, res) => {
    const newPokemon = req.body;
    // // Add the new Pokemon to your dataset
    addedpokemons.push(newPokemon);
    updateCache();
    res.status(201).send({'msg':'New Pokémon added', data:newPokemon});

});
router.get('/pokemon', getAllPokemon);


export default router;