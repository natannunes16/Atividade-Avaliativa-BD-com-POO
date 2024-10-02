const Purchase = require('../models/Purchase');

exports.createPurchase = async (req, res) => {
  const { nomeProduto, preco } = req.body;
  try {
    const newPurchase = new Purchase({ nomeProduto, preco });
    await newPurchase.save();
    return res.status(201).json({ message: 'Compra registrada com sucesso' });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao registrar compra', error });
  }
};

exports.getAllPurchases = async (req, res) => {
  try {
    const purchases = await Purchase.find();
    return res.status(200).json(purchases);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao recuperar compras', error });
  }
};
