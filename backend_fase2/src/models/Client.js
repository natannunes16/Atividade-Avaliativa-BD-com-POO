const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  cpf: { type: String, required: true },
  idade: { type: Date, required: true }, 
  descontoCliente: {type: Number, default: 0 },
  numeroCompras: { type: Number, default: 0 }, 
  tempoCliente: { type: Date, default: Date.now }, 
});

module.exports = mongoose.model('Cliente', clientSchema);
