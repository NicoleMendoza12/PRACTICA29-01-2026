import { getProducts, deleteProduct } from '../../services/productService';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProductsPage = () => {
    // 1. Inicializamos siempre como un array vacío
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await getProducts();
            
            // LOG DE DEPURACIÓN: Mira tu consola (F12) para ver qué imprime esto
            console.log("Datos recibidos de la API:", response.data);

            // 2. PROTECCIÓN: Verificamos si es un array antes de guardar
            if (response.data && Array.isArray(response.data)) {
                setProducts(response.data);
            } else {
                console.error("La API no devolvió un array:", response.data);
                setProducts([]); // Forzamos array vacío si la API manda otra cosa
            }
        } catch (error) {
            console.error('Error fetching products:', error);
            setProducts([]); 
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
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {/* 3. SEGUNDA PROTECCIÓN: Solo mapeamos si products es array */}
                    {Array.isArray(products) && products.length > 0 ? (
                        products.map((product) => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.nombre}</td>
                                <td>{product.descripcion}</td>
                                <td>
                                    <button onClick={() => navigate(`/products/edit/${product.id}`)}>Editar</button>
                                    <button onClick={() => handleDelete(product.id)}>Eliminar</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr><td colSpan="4">No hay productos disponibles.</td></tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default ProductsPage;