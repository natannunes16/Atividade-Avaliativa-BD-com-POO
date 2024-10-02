const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  cpf: { type: String, required: true, unique: true },
  dataCadastro: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Usuario', userSchema);
