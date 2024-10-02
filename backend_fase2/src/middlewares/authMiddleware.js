const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1] || '';

  if (!token) {
    return res.status(401).json({ message: 'Autenticação necessária' });
  }

  try {
   
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(403).json({ message: 'Token expirado' });
    } else if (error.name === 'JsonWebTokenError') {
      return res.status(403).json({ message: 'Token inválido' });
    } else {
      return res.status(403).json({ message: 'Erro na verificação do token' });
    }
  }
};


module.exports = authMiddleware;