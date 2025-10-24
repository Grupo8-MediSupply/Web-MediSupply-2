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
          precio: 80000
        },
        {
          productoRegionalId: "315b0fef-cbf0-4631-8665-aeeb18501863",
          sku: "MED-201",
          nombre: "Loratadina 200mg",
          descripcion: "Analgésico y antipirético",
          tipo: "MEDICAMENTO",
          precio: 20000
        }
      ],
      timestamp: new Date().toISOString()
    };
  }
};

export default mockCatalogoService;
