/** @type {import("eslint").Linter.Config} */
const config = {
    extends: [
        "next", "turbo", "prettier", "plugin:@typescript-eslint/recommended",
    ],
    parser: "@typescript-eslint/parser",
    plugins: [
        "@typescript-eslint", "import"
    ],
    rules: {
        "@next/next/no-html-link-for-pages": "off",
        "turbo/no-undeclared-env-vars": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-unused-vars": [
            "warn",
            { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
        ],
        "@typescript-eslint/restrict-template-expressions": "off",
        "@typescript-eslint/ban-types": "off",
    },
    parserOptions: {
        ecmaFeatures: { jsx: true },
    },
    ignorePatterns: [
        "**/*.config.js",
        "**/*.config.cjs",
        ".eslintrc.cjs",
        "packages/config/**",
        "**/dist/**",
        "**/.next/**",
    ],
    reportUnusedDisableDirectives: true,
};

module.exports = config;