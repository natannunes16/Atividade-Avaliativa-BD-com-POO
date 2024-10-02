const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  precoAtual: { type: Number, required: true },
  precoPromocional: { type: Number, default: null },
  tipo: { type: String, required: true },
  descricao: { type: String },
  validade: { type: Date, required: true },
  img: { type: String,}
});

module.exports = mongoose.model('Produto', productSchema);
