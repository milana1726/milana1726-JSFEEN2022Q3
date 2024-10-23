/* eslint @typescript-eslint/no-var-requires: "off" */
const path = require('path');

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.resolve(__dirname, '../dist'),
    },
};
