import baseConfig from '@rocketseat/eslint-config/node.mjs'
import importNewLines from 'eslint-plugin-import-newlines'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  {
    ignores: ['src/discord/base/**', 'src/settings/**'],
  },
  {
    extends: [...baseConfig],
    plugins: {
      'import-newlines': importNewLines,
    },
    rules: {
      'import-newlines/enforce': ['warn', { items: 40, 'max-len': 80 }],
    }
  },
])
