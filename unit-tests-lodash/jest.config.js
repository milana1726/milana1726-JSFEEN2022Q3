module.exports = {
  collectCoverage: true,

  coveragePathIgnorePatterns: ['./src/node_modules/'],

  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
    },
  },
};
