module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
      '^.+\\.(t|j)sx?$': 'ts-jest',
    },
    moduleFileExtensions: ['ts', 'js', 'json'],
    transformIgnorePatterns: ['node_modules/(?!@nestjs)'],
    globals: {
      'ts-jest': {
        isolatedModules: true,
      },
    },
  };
  