import { createProduct } from '../../services/productService';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

// Mantenemos el esquema para validación local
const productSchema = z.object({
  nombre: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  descripcion: z.string().max(200, "Máximo 200 caracteres")
});

const CreateProductPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: ''
  });
  
  // Estado para manejar errores visuales de Zod
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); // Limpiar errores previos

    try {
      const resultado = productSchema.safeParse(formData);

      if (!resultado.success) {
        // Mapear errores de Zod para mostrarlos si es necesario
        const fieldErrors = resultado.error.format();
        setErrors(fieldErrors);
        console.log("Errores de validación:", fieldErrors);
        return;
      }

      // IMPORTANTE: Enviamos solo los campos que MockAPI espera según tu captura
      // No enviamos ID porque MockAPI lo genera solo como "Object ID"
      await createProduct({
        nombre: formData.nombre,
        descripcion: formData.descripcion
      });

      alert("Producto creado con éxito");
      navigate('/products');
      
    } catch (error) {
      // Si la API responde con 400, aquí veremos por qué
      console.error('Error detallado de la API:', error.response?.data);
      alert("Error del servidor: " + (error.response?.data || "Revisa la consola"));
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
          {errors.nombre && <p style={{color: 'red'}}>{errors.nombre._errors[0]}</p>}
        </div>
        <br />
        <div>
          <label>Descripción:</label>
          <input
            type="text"
            value={formData.descripcion}
            onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
            required
          />
          {errors.descripcion && <p style={{color: 'red'}}>{errors.descripcion._errors[0]}</p>}
        </div>
        <br />
        <button type="submit">Crear Producto</button>
        <button type="button" onClick={() => navigate('/products')}>Cancelar</button>
      </form>
    </div>
  );
}

export default CreateProductPage;