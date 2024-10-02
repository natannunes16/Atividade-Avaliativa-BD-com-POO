const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
    clienteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente', required: true },
    produtoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Produto', required: true },
    preco: { type: Number, required: true },
    dataCompra: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Compra', purchaseSchema);
