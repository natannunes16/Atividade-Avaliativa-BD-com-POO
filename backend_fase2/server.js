require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const app = express();
const cors = require('cors');

const userRoutes = require('./src/routes/userRoutes');
const productRoutes = require('./src/routes/productRoutes');
const promotionRoutes = require('./src/routes/promotionRoutes');
const clientRoutes = require('./src/routes/clientRoutes');

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:3001', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  credentials: true 
}));

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Conectado ao MongoDB'))
  .catch((error) => console.log('Erro ao conectar ao MongoDB:', error));

app.use('/api/usuarios', userRoutes);
app.use('/api/produtos', productRoutes);
app.use('/api/promocoes', promotionRoutes);
app.use('/api/clientes', clientRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
