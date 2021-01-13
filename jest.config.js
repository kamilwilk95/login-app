module.exports = {
    roots: ["<rootDir>/src"],
    transform: {
        "^.+\\.tsx?$": "ts-jest"
    },
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
    coveragePathIgnorePatterns: [
        ".mock.ts"
    ],
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    testEnvironment: "jest-environment-jsdom-sixteen",
    globals: {
        "ts-jest": {
            tsconfig: 'tsconfig.json',
            diagnostics: {
                warnOnly: true
            }
        }
    }
};