import {getProducts,deleteProduct} from '../../services/productService';
import {useEffect,useState} from 'react';
import { useNavigate } from 'react-router-dom';


const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await getProducts();
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }  
    };


    const handleDelete = async (id) => {
        const confirmed = window.confirm('¿Estás seguro de que quieres eliminar este producto?');
        if (!confirmed) return;
        try {  
            await deleteProduct(id);
            fetchProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };


    useEffect(() => {
        fetchProducts();
    }, []);


    if (loading) {
        return <div>Cargando productos...</div>;
    }
    return (
        <div>
            <h1>Lista de Productos</h1>
            <button onClick={fetchProducts}>Refrescar</button>
            <button onClick={() => navigate('/products/create')}>Agregar Producto</button><br/>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Descripcion</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.nombre}</td>
                            <td>{product.descripcion}</td>
                            <td>
                                <button onClick={() => navigate(`/products/edit/${product.id}`)}>Editar</button>
                                <button onClick={() => handleDelete(product.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
export default ProductsPage;
   
