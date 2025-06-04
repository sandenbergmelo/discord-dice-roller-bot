import baseConfig from '@rocketseat/eslint-config/node.mjs'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  ...baseConfig,
  {
    ignores: ['src/discord/base/**', 'src/settings/**'],
  },
  {
    languageOptions: {
      globals: {
        animated: 'readonly',
        withResponse: 'readonly',
        flags: 'readonly',
        required: 'readonly',
        inline: 'readonly',
        disabled: 'readonly',
        __rootname: 'readonly',
        autocomplete: 'readonly',
        rootTo: 'readonly',
      },
    },
  },
])
