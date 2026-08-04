

export default {
  testEnvironment: "node",

  transform: {},

  globalSetup: "./tests/globalSetup.js",
  globalTeardown: "./tests/globalTeardown.js",

  testTimeout: 30000,

  testMatch: [
    "**/tests/**/*.test.js",
    "**/*.test.js"
  ],

  testPathIgnorePatterns: [
    "/node_modules/"
  ]
};