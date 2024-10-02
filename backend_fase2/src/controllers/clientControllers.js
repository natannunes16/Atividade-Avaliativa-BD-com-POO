const Cliente = require('../models/Client');

exports.getAllClients = async (req, res) => {
    try {
        const clientes = await Cliente.find();
        return res.status(200).json(clientes);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao buscar clientes.', error: error.message });
    }
};

exports.applyDiscountToClient = async (req, res) => {
    const { clienteId } = req.params;

    try {
        const cliente = await Cliente.findById(clienteId);
        if (!cliente) {
            return res.status(404).json({ message: 'Cliente não encontrado.' });
        }

        const dataAtual = new Date();
        const tempoComoCliente = Math.floor((dataAtual - cliente.tempoCliente) / (1000 * 60 * 60 * 24 * 365)); 
        const numeroCompras = cliente.numeroCompras;

        let descontoPercentual = 0;
        if (tempoComoCliente > 1) {
            descontoPercentual += tempoComoCliente * 2; 
        }
        if (numeroCompras > 5) {
            descontoPercentual += Math.min(numeroCompras, 10); 
        }

        cliente.descontoCliente = descontoPercentual;
        await cliente.save();

        return res.status(200).json({
            message: `Desconto de ${descontoPercentual}% aplicado e salvo com sucesso.`,
            descontoPercentual
        });
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao aplicar desconto ao cliente.', error: error.message });
    }
};
