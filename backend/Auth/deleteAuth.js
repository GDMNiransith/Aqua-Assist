
const jwt = require('jsonwebtoken');


const authenticate = (req, res, next) => {
 
  const token = req.headers.authorization.split(' ')[1];

  jwt.verify(token, 'myjwtsecret', (error, decodedToken) => {
    
    if (error) {
      
      console.log(error);
      return res.status(401).json({ error: 'Invalid token' });
      
    }
 console.log(decodedToken)
    req.decodedToken = decodedToken;
    next();
  });
};
module.exports = authenticate;
