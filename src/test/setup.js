import '@testing-library/jest-dom'

// Mock de localStorage para pruebas
const localStorageMock = (() => {
  let store = {}

  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => {
      store[key] = value.toString()
    },
    removeItem: (key) => {
      delete store[key]
    },
    clear: () => {
      store = {}
    },
  }
})()

// Asignar mocks a objetos globales
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
})

// Mock de import.meta.env
vi.mock('import.meta.env', () => ({
  default: {
    VITE_USE_MOCK_API: 'true',
    VITE_API_BASE_URL: 'http://test-api.com',
    VITE_API_VERSION: 'v1',
    DEV: true
  },
  VITE_USE_MOCK_API: 'true',
  VITE_API_BASE_URL: 'http://test-api.com',
  VITE_API_VERSION: 'v1',
  DEV: true
}))
