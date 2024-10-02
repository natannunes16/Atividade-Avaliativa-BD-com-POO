const mongoose = require('mongoose');

const promocaoSchema = new mongoose.Schema({
  produtoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Produto', required: true },
  descontoPercentual: { type: Number, required: true },
  descricao: { type: String },
  dataInicio: { type: Date, required: true },
  dataFim: { type: Date, required: true },
});

module.exports = mongoose.model('Promocao', promocaoSchema);
