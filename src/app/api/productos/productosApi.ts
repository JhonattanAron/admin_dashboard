const API_URL = "http://localhost:3000/api/productos"; // Cambia la URL según tu configuración

// Obtener todos los productos
export const fetchProductos = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Error al obtener los productos");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Crear un nuevo producto
export const createProducto = async (producto: undefined) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(producto),
    });
    if (!response.ok) {
      throw new Error("Error al crear el producto");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Eliminar un producto por ID
export const deleteProducto = async (id: number) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Error al eliminar el producto");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
