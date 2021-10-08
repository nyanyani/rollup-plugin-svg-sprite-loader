const path = require("path")

const webpackAlias = {
  "import/resolver": {
    webpack: {
      config: {
        resolve: {
          alias: {
            "@": path.resolve(__dirname, "src/"),
          },
          extensions: ["js", "jsx", "mjs", "ts", "tsx"],
        },
      },
    },
  },
}

module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ["eslint:recommended", "airbnb", "plugin:react/recommended", "prettier"],
  plugins: ["react", "react-hooks"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  settings: {
    ...webpackAlias,
  },
  rules: {
    "react-hooks/rules-of-hooks": 2,
    "react-hooks/exhaustive-deps": 1,
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
    "no-unused-vars": 1,
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
    "jsx-a11y/label-has-associated-control": [
      2,
      {
        labelComponents: ["CustomInputLabel"],
        labelAttributes: ["label"],
        controlComponents: ["CustomInput"],
        depth: 3,
      },
    ],
    "import/no-unresolved": [2, { ignore: ["^@theme", "^@docusaurus", "^@generated", ".svg$"] }],
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
    "react/jsx-closing-bracket-location": 0, // Conflicts with Prettier.
    "import/prefer-default-export": 0,
    "max-len": [2, { code: 120 }],
    "react/jsx-props-no-spreading": [0],
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
      extends: ["airbnb-typescript"],
      settings: {
        "import/core-modules": ["@storybook/react"],
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
        "react/button-has-type": 0,
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
        "import/extensions": [
          2,
          "ignorePackages",
          {
            js: "never",
            mjs: "never",
            jsx: "never",
            ts: "never",
            tsx: "never",
          },
        ],
        "@typescript-eslint/indent": [
          0,
          2,
          {
            ignoredNodes: ["TSTypeParameterInstantiation"],
          },
        ],
        "react/require-default-props": 0,
        "@typescript-eslint/no-use-before-define": [2, { functions: false }],
      },
    },
  ],
}
