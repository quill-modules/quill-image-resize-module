import { factory } from '@zzxming/eslint-config';

export default factory({
  typescript: false,
  overrides: [
    {
      ignores: ['docs'],
    },
    {
      rules: {
        'unicorn/no-array-for-each': 'off',
      },
    },
  ],
});
