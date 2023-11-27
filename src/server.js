// imported express package
import express from 'express';
import envConfig from "./config/env.config.js";
import pokemonRoute  from "./routers/pokemonRouter.js"
import bodyParser from 'body-parser';

//created a new express instance
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))

// Use body-parser middleware to parse JSON requests
app.use(bodyParser.json());



app.use('/api', pokemonRoute);






app.listen(envConfig.port, () => {
    console.log(`Server is listening on port ${envConfig.port}`);
  });