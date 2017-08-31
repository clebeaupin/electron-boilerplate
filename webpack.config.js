const path = require('path');

module.exports = {
    entry: "./src/main.js",
    output: {
        path: __dirname,
        filename: "dist/bundle.js"
    },
    target: "electron-main",

    node: {
        __dirname: false,
        __filename: false,
    },

    resolve: {
        extensions: ['.js', '.json', '.node'],
        modules: [
          path.join(__dirname, 'src'),
          path.join(__dirname, 'src', "node_modules"),
          'node_modules',
        ]
    },

    // Webpack is unable to manage native modules

    externals: {
        "leveldown": "require('leveldown')",
    }
};
