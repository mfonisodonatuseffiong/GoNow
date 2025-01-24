const jwt = require('jsonwebtoken');

// Replace 'your_jwt_secret' with your actual JWT secret from the .env file
const secret = 'c048ae4a556e071a0c3d4811b4e27e11d0bcf3d0008603843181fb0f92d9144b577f3abc7a967635d456c5c3d626e8aaf3e77d82419e0c09e8d88f6b574fba5e';

const user = { id: 1 }; // user payload
const token = jwt.sign(user, secret, { expiresIn: '1h' });

console.log('Generated JWT Token:', token);
