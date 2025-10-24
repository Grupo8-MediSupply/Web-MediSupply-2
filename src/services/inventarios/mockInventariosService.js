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
  }
};

export default mockInventariosService;
