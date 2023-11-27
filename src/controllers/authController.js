import { users } from "../data/users.js";

function isAuthenticated(req, res, next) {
    const token = req.headers.authorization;

    // Check if the provided token matches any user's token
    const userExists = users.some(user => user.token === token);

    if (userExists) {
        next(); // Proceed if the token is valid
    } else {
        res.status(401).send('Unauthorized');
    }
}



export default isAuthenticated