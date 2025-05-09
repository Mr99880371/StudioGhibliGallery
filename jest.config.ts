import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom', // Caso esteja testando em um ambiente de navegador simulado
  moduleNameMapper: {
    '\\.css$': '<rootDir>/__mocks__/styleMock.ts', // Mapeia importações de arquivos CSS
    '\\.svg$': '<rootDir>/__mocks__/svgMock.ts', // Mapeia importações de arquivos SVG
  },
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '<rootDir>/src/App.test.tsx'], // Ignora testes nessas pastas
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest', // Transforma arquivos TS/TSX com ts-jest
    '^.+\\.(js|jsx)$': 'babel-jest', // Para arquivos JS/JSX, use babel-jest    
  },
  setupFilesAfterEnv: ['@testing-library/jest-dom'], // Configurações adicionais do Testing Library
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}', // Para coletar cobertura de testes de arquivos TS/TSX
    '!src/**/*.d.ts', // Ignora arquivos de declaração
  ],
};

export default config;
