import axios from "axios";

const getPokemonData = async () => {
    const apiUrl = 'https://meetdata.dev.audo.com/pokemon.json'; // Replace with your actual API URL
  
    try {
      const response = await axios.get(apiUrl);
      return response.data;
    } catch (error) {
      console.error('Error fetching Pokemon data:', error);
      return [];
    }
  };

  export default {getPokemonData}