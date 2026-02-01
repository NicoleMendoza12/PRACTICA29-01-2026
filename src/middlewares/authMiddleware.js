const jwt = require('jsonwebtoken');

const SECRET_KEY = 'tu_clave_secreta_super_segura_2026'; // Cambiar en producción

const authMiddleware = (req, res, next) => {
    try {
        // Obtener token del header
        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Acceso denegado. No se proporcionó token de autenticación.'
            });
        }

        // Verificar token
        const decoded = jwt.verify(token, SECRET_KEY);
        req.userId = decoded.userId;
        next();
        
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Token inválido o expirado.'
        });
    }
};

module.exports = authMiddleware;