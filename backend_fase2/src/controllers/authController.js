const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcrypt'); 

const login = async (req, res) => {
  const { email, senha } = req.body; 

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'E-mail ou senha incorretos' });
    }
    const isMatch = await bcrypt.compare(senha, user.senha);
    if (!isMatch) {
      return res.status(401).json({ message: 'E-mail ou senha incorretos' });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '1h' 
    });

   
    res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'Strict' }); 
    res.status(200).json({ message: 'Login bem-sucedido', token });
  } catch (error) {
    console.error(error); 
    res.status(500).json({ message: error.message });
  }
};

module.exports = { login };
