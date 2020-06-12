module.exports = {
  env: {
    browser: true,
    es2020: true
  },
  extends: [
    'plugin:react/recommended',
    'react-app',
    'standard'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 11,
    sourceType: 'module'
  },
  settings: {
    react: {
      version: "detect"
    }
  },
  plugins: [
    'react'
  ],
  rules: {
  }
}
