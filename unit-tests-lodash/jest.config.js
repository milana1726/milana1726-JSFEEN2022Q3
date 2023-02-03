module.exports = {
    collectCoverage: true,

    // coveragePathIgnorePatterns: ['./src/node_modules/', './src/arrays_methods/helpers'],

    coverageThreshold: {
      global: {
        branches: 80,
        functions: 80,
      },
    },
};
