module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    "jest/globals": true,
  },
  extends: ["eslint:recommended", "prettier"],
  plugins: ["jest"],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  rules: {
    quotes: [2, "double", { allowTemplateLiterals: true }],
    semi: 0,
    "comma-dangle": [
      2,
      {
        arrays: "ignore",
        objects: "always-multiline",
        functions: "never",
        imports: "ignore",
      },
    ],
    "func-names": [2, "as-needed"],
    "object-curly-spacing": [2, "always"],
    "linebreak-style": [2, "windows"],
    "prefer-const": 1,
    "consistent-return": [0, { treatUndefinedAsUnspecified: true }],
    "no-shadow": [2, { hoist: "never" }],
    "no-restricted-syntax": [0],
    "no-use-before-define": [0, { functions: false, classes: false }],
    "no-plusplus": 0,
    "implicit-arrow-linebreak": [0, "beside"],
    "wrap-iife": [2, "inside", { functionPrototypeMethods: true }],
    "object-curly-newline": [0],
    "no-param-reassign": [2, { props: false }],
    "max-classes-per-file": [2, 5],
    "header/header": [
      0,
      "block",
      [
        {
          pattern: ".* @format",
        },
        " ",
      ],
    ],
    "import/prefer-default-export": 0,
    "max-len": [2, { code: 120 }],
    "no-underscore-dangle": 0,
  },
  overrides: [
    {
      files: "**/*.+(ts|tsx)",
      parser: "@typescript-eslint/parser",
      parserOptions: {
        project: "./tsconfig.json",
      },
      plugins: ["@typescript-eslint/eslint-plugin"],
      extends: [],
      settings: {
        "import/resolver": {
          node: {
            extensions: [".js", ".jsx", ".ts", ".tsx"],
          },
          typescript: {},
          // ...webpackAlias["import/resolver"],
        },
        "import/parsers": {
          "@typescript-eslint/parser": [".ts", ".tsx"],
        },
      },
      rules: {
        "no-unused-vars": 0,
        "@typescript-eslint/no-unused-vars": 1,
        quotes: 0,
        "@typescript-eslint/quotes": [2, "double", { allowTemplateLiterals: true }],
        semi: 0,
        "@typescript-eslint/semi": 0,
        "@typescript-eslint/member-delimiter-style": [
          0,
          {
            multiline: {
              delimiter: "comma",
              requireLast: true,
            },
            singleline: {
              delimiter: "comma",
              requireLast: true,
            },
            overrides: {
              interface: {
                multiline: {
                  delimiter: "semi",
                  requireLast: true,
                },
              },
            },
          },
        ],
        "comma-dangle": 0,
        "@typescript-eslint/comma-dangle": [
          2,
          {
            arrays: "ignore",
            objects: "always-multiline",
            functions: "never",
            imports: "ignore",
          },
        ],
        "@typescript-eslint/indent": [
          0,
          2,
          {
            ignoredNodes: ["TSTypeParameterInstantiation"],
          },
        ],
        "@typescript-eslint/no-use-before-define": [2, { functions: false }],
      },
    },
  ],
}
