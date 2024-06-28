module.exports = {
    root: true,
    env: {
      node: true, // Enable Node.js global variables and Node.js scoping
      es6: false, // Disable ES6 features to indicate CommonJS usage
    },
    extends: [
      'eslint:recommended', // Use ESLint's recommended rules
      'plugin:node/recommended', // Use Node.js recommended rules from eslint-plugin-node
    ],
    parserOptions: {
      ecmaVersion: 2018, // Adjust based on your Node.js version compatibility
    },
    rules: {
      // Additional rules specific to your project
      'node/no-extraneous-require': ['error', {
        allowModules: [], // Allow certain modules to be required without throwing errors
      }],
      'node/no-missing-require': ['error', {
        allowModules: [], // Allow certain modules to be missing when required
      }],
      'node/no-unpublished-require': ['error', {
        allowModules: [], // Allow certain modules that are unpublished in npm
      }],
      'node/no-unsupported-features/es-syntax': 'off', // Disable ES syntax checks
      'node/shebang': 'off', // Allow or disallow shebang in scripts
      'node/no-path-concat': 'error', // Disallow string concatenation with __dirname and __filename
      'node/handle-callback-err': ['error', '^(err|error)$'], // Enforce callback error handling pattern
      'node/no-callback-literal': 'error', // Disallow using a callback parameter with a literal
      'node/callback-return': 'error', // Enforce return after a callback
      'node/global-require': 'error', // Require require() calls to be placed at top-level module scope
    },
  };
  