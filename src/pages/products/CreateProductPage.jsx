import {createProduct} from '../../services/productService';
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';


const CreateProductPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nombre: '',
        descripcion: ''
    });
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createProduct(formData);
            navigate('/products');
        } catch (error) {
            console.error('Error creating product:', error);
        }
    }
    return (
        <div>
            <h1>Crear Nuevo Producto</h1>  
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre:</label>
                    <input
                        type="text"
                        value={formData.nombre}
                        onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                        required
                    />
                </div>
                <div>
                    <label>Descripcion:</label>
                    <input
                        type="text"
                        value={formData.descripcion}
                        onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
                        required
                    />
                </div>
                <button type="submit">Crear Producto</button>
                <button type="button" onClick={() => navigate('/products')}>Cancelar</button>
            </form>
        </div>
    );
}
export default CreateProductPage;
