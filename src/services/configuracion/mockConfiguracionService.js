const mockConfiguracionService = {
  getConfiguracion: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));

    const configuracionPorPais = {
      '10': {
        success: true,
        result: {
          pais: {
            id: "10",
            codigoIso: "COL",
            nombre: "Colombia",
            moneda: "Peso colombiano",
            simboloMoneda: "$",
            zonaHoraria: "America/Bogota",
            idiomaOficial: "Español",
            reguladorSanitario: "INVIMA",
            sigla_moneda: "COP"
          },
          tiposIdentificacion: [
            {
              id: "1",
              nombre: "CÉDULA DE CIUDADANÍA",
              abreviatura: "CC",
              paisId: "10"
            },
            {
              id: "2",
              nombre: "NÚMERO DE IDENTIFICACIÓN TRIBUTARIA",
              abreviatura: "NIT",
              paisId: "10"
            }
          ]
        },
        timestamp: new Date().toISOString()
      },
      '20': {
        success: true,
        result: {
          pais: {
            id: "20",
            codigoIso: "MEX",
            nombre: "México",
            moneda: "Peso mexicano",
            simboloMoneda: "$",
            zonaHoraria: "America/Mexico_City",
            idiomaOficial: "Español",
            reguladorSanitario: null,
            sigla_moneda: "MXN"
          },
          tiposIdentificacion: [
            {
              id: "3",
              nombre: "REGISTRO FEDERAL DE CONTRIBUYENTES",
              abreviatura: "RFC",
              paisId: "20"
            },
            {
              id: "4",
              nombre: "CLAVE UNICA DE REGISTRO DE POBLACION",
              abreviatura: "CURP",
              paisId: "20"
            }
          ]
        },
        timestamp: new Date().toISOString()
      }
    };

    // Obtener el país del token JWT
    const token = localStorage.getItem('access_token');
    if (!token) return configuracionPorPais['10']; // Default a Colombia

    try {
      const payload = token.split('.')[1];
      const { pais } = JSON.parse(atob(payload));
      return configuracionPorPais[pais] || configuracionPorPais['10'];
    } catch (error) {
      console.error('Error al decodificar token:', error);
      return configuracionPorPais['10'];
    }
  }
};

export default mockConfiguracionService;
