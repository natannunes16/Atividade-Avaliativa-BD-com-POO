const Produto = require('../models/Product');
const multer = require('multer');
const fs = require('fs');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

exports.createProduct = async (req, res) => {
    const { nome, precoAtual, precoPromocional, tipo, descricao, validade } = req.body;

    try {
        let imageBase64 = '';
        if (req.file) {
            imageBase64 = req.file.buffer.toString('base64');
        }
        const newProduct = new Produto({ nome, precoAtual, precoPromocional, tipo, descricao, validade, img: imageBase64 });
        await newProduct.save();
        return res.status(201).json({ message: 'Produto criado com sucesso.', product: newProduct });
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao criar o produto.', error: error.message });
    }
};

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Produto.find();
        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao buscar produtos.', error: error.message });
    }
};

exports.getProductById = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Produto.findById(id);
            
        if (!product) {
            return res.status(404).json({ message: 'Produto não encontrado.' });
        }

        return res.status(200).json(product);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao buscar o produto.', error: error.message });
    }
};

exports.updateProduct = async (req, res) => {
    const { id } = req.params;
    const { nome, precoAtual, precoPromocional, tipo, descricao, validade } = req.body;

    try {
        let imageBase64 = '';
        if (req.file) {
            imageBase64 = req.file.buffer.toString('base64');
        }
        const updatedProduct = await Produto.findByIdAndUpdate(
            id,
            { nome, precoAtual, precoPromocional, tipo, descricao, validade },
            { new: true, runValidators: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Produto não encontrado.' });
        }

        return res.status(200).json({ message: 'Produto atualizado com sucesso.', product: updatedProduct });
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao atualizar o produto.', error: error.message });
    }
};

exports.deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedProduct = await Produto.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({ message: 'Produto não encontrado.' });
        }

        return res.status(200).json({ message: 'Produto removido com sucesso.' });
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao remover o produto.', error: error.message });
    }
};

exports.uploadImage = upload.single('img');
