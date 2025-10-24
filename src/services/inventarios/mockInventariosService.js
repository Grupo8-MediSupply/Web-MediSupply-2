const mockInventariosService = {
  getBodegas: async () => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return {
      success: true,
      result: [
        {
          id: "d4c30897-e898-42d4-b890-96ff8af955d0",
          paisId: "10",
          nombre: "Central",
          ubicacion: "Bogota",
          capacidad: 14000,
          responsable: "Manuel Gonzales",
          createdAt: "2025-10-22T04:02:01.613Z",
          updatedAt: "2025-10-22T04:02:01.613Z"
        },
        {
          id: "f084da73-6d8f-4cd0-be3e-71c6f0aadce6",
          paisId: "10",
          nombre: "Occidente",
          ubicacion: "Medellin",
          capacidad: 12500,
          responsable: "Rita Tejada",
          createdAt: "2025-10-22T04:02:01.613Z",
          updatedAt: "2025-10-22T04:02:01.613Z"
        }
      ],
      timestamp: new Date().toISOString()
    };
  },

  getProductosInBodega: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const mockProductos = {
      "f084da73-6d8f-4cd0-be3e-71c6f0aadce6": [
        {
          "BodegaId": "f084da73-6d8f-4cd0-be3e-71c6f0aadce6",
          "nombreProducto": "Paracetamol 800mg",
          "cantidad": 3000,
          "FechaVencimiento": "2025-12-12T00:00:00.000Z",
          "sku": "MED-20",
          "productoRegionalId": "03700796-ef17-4923-8368-22d718c5a5cd",
          "numeroLote": "324523",
          "loteId": "ce471079-7433-4e11-b238-750c006aaff3"
        },
        {
          "BodegaId": "f084da73-6d8f-4cd0-be3e-71c6f0aadce6",
          "nombreProducto": "Loratadina 500mg",
          "cantidad": 4500,
          "FechaVencimiento": "2026-09-11T00:00:00.000Z",
          "sku": "MED-202",
          "productoRegionalId": "bf30aa4f-0eab-4767-a14c-f86b7ce4e3a1",
          "numeroLote": "356789",
          "loteId": "ee2ab508-97b5-4397-b686-68922c3e451a"
        }
      ]
    };

    return {
      success: true,
      result: mockProductos[id] || [],
      timestamp: new Date().toISOString()
    };
  }
};

export default mockInventariosService;
