const Product = require('../models/product');

// Crear producto
const createProduct = async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();

        res.status(201).json({
            success: true,
            message: 'Producto creado exitosamente',
            data: newProduct
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error al crear producto',
            error: error.message
        });
    }
};

// Obtener todos los productos
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();

        res.status(200).json({
            success: true,
            message: 'Productos obtenidos exitosamente',
            count: products.length,
            data: products
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener productos',
            error: error.message
        });
    }
};

// Obtener producto por ID
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Producto no encontrado'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Producto obtenido exitosamente',
            data: product
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener producto',
            error: error.message
        });
    }
};

// Actualizar producto
const updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({
                success: false,
                message: 'Producto no encontrado'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Producto actualizado exitosamente',
            data: updatedProduct
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error al actualizar producto',
            error: error.message
        });
    }
};

// Eliminar producto
const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);

        if (!deletedProduct) {
            return res.status(404).json({
                success: false,
                message: 'Producto no encontrado'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Producto eliminado exitosamente',
            data: deletedProduct
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al eliminar producto',
            error: error.message
        });
    }
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
};