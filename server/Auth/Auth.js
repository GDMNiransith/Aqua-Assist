const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ msg: 'Authentication token is missing' });
 
  jwt.verify(token,'myjwtsecret', (err, decoded) => {
    if (err) return res.status(401).json({ msg: 'Invalid token' });
  
    req.user = decoded.user;
    next();
  });
}

module.exports = authenticateToken;
