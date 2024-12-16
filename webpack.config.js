const path = require('path');

module.exports = {
    entry: './src/index.js', // Entry point
    output: {
        filename: 'bundle.js', // Output bundle file
        path: path.resolve(__dirname, 'dist'), // Output directory
    },
    module: {
        rules: [
            {
                test: /\.css$/, // Apply this rule for CSS files
                use: ['style-loader', 'css-loader'], // Loaders for CSS
            },
        ],
    },
    mode: 'production', // Set mode to production
};