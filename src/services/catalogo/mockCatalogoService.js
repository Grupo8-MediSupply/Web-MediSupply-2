const mockCatalogoService = {
  getProductos: async () => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return {
      success: true,
      result: [
        {
          productoRegionalId: "03700796-ef17-4923-8368-22d718c5a5cd",
          sku: "MED-20",
          nombre: "Paracetamol 800mg",
          descripcion: "Analgésico y antipirético",
          tipo: "MEDICAMENTO",
          precio: 80000,
          medicamento: {
            principioActivo: "Paracetamol",
            concentracion: "800mg",
            formaFarmaceutica: "Tableta"
          }
        },
        {
          productoRegionalId: "315b0fef-cbf0-4631-8665-aeeb18501863",
          sku: "MED-201",
          nombre: "Loratadina 200mg",
          descripcion: "Analgésico y antipirético",
          tipo: "MEDICAMENTO",
          precio: 20000,
          medicamento: {
            principioActivo: "Loratadina",
            concentracion: "200mg",
            formaFarmaceutica: "Tableta"
          }
        }
      ],
      timestamp: new Date().toISOString()
    };
  },

  createProducto: async (productoData) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    // Asegurarse de que el mock retorne la misma estructura que la API real
    const mockResponse = {
      success: true,
      result: {
        sku: productoData.sku,
        nombre: productoData.nombre,
        descripcion: productoData.descripcion,
        tipo: productoData.tipo,
        precio: productoData.precioVenta,
        proveedorId: productoData.proveedorId
      },
      timestamp: new Date().toISOString()
    };
    return mockResponse;
  },

  getProductoById: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return {
      success: true,
      result: {
        producto_info: {
          id: "03700796-ef17-4923-8368-22d718c5a5cd",
          createdAt: "2025-11-07T04:44:19.397Z",
          updatedAt: "2025-11-07T04:44:19.397Z",
          sku: "MED-20",
          nombre: "Paracetamol 800mg",
          descripcion: "Analgésico y antipirético",
          concentracion: "800mg"
        },
        tipo: "MEDICAMENTO",
        precio: 80000,
        proveedor: {
          id: "18c1a721-39f6-4f55-9b83-51cee9cfb96e",
          nombre: "Prueba gcp2",
          pais: "México"
        },
        productoPaisId: "10",
        bodegas: [
          {
            bodegaId: "d4c30897-e898-42d4-b890-96ff8af955d0",
            bodegaNombre: "Central",
            lotes: [
              {
                loteId: "ce471079-7433-4e11-b238-750c006aaff3",
                cantidad: 3000
              }
            ]
          },
          {
            bodegaId: "f084da73-6d8f-4cd0-be3e-71c6f0aadce6",
            bodegaNombre: "Occidente",
            lotes: [
              {
                loteId: "ee2ab508-97b5-4397-b686-68922c3e451a",
                cantidad: 2000
              }
            ]
          }
        ]
      },
      timestamp: new Date().toISOString()
    };
  }
};

export default mockCatalogoService;
