module.exports = {
    entry: "./src/main.ts",
    output: {
        path: __dirname,
        filename: "dist/bundle-ts.js"
    },
    target: "electron-main",

    module: {
        loaders: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loaders: ["awesome-typescript-loader"] },
        ]
    },

    node: {
        __dirname: false,
        __filename: false,
    },
};
