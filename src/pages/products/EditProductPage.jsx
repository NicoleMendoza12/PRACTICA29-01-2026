import {getProductById, updateProduct} from '../../services/productService';
import {useEffect,useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';  
const EditProductPage = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nombre: '',
        descripcion: ''
    });


    const fetchProduct = async () => {
        try {
            const response = await getProductById(id);
            setFormData(response.data);
        } catch (error) {
            console.error('Error fetching product:', error);
        }
    };


    useEffect(() => {
        fetchProduct();
    }, [id]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateProduct(id, formData);
            navigate('/products');
        } catch (error) {
            console.error('Error updating product:', error);
        }  
    }
    return (
        <div>  
            <h1>Editar Producto</h1>
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
                    <textarea rows="4"
                        value={formData.descripcion}
                        onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
                        required
                    ></textarea>
                </div>
                <button type="submit">Actualizar Producto</button>
                <button type="button" onClick={() => navigate('/products')}>Cancelar</button>
            </form>
        </div>
    );
}
export default EditProductPage;
