const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./src/config/database');
const authRoutes = require('./src/routes/authRoutes');
const productRoutes = require('./src/routes/productRoutes');

const app = express();
const PORT = 3000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


connectDB();


app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);


app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'API de PNMO01022026 - Sistema de Usuarios y Productos',
        endpoints: {
            auth: {
                register: 'POST /api/auth/register',
                login: 'POST /api/auth/login'
            },
            products: {
                create: 'POST /api/products',
                getAll: 'GET /api/products',
                getById: 'GET /api/products/:id',
                update: 'PUT /api/products/:id',
                delete: 'DELETE /api/products/:id'
            }
        }
    });
});


app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});