const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// importuję bibliotekę [path] z [node.js]
module.exports = {
 entry: './assets/js/script.js',
 // definiuję plik wejściowy
 output: {
 path: path.resolve(__dirname, 'build'),
 // definiuję ścieżkę wyjściową
 filename: 'script.min.js',
 // definiuję nazwę pliku wyjściowego
 },
 module: {
 rules: [
    {
        test: /\.js$/,
        // określam, jakie pliki
        // będą brane pod uwagę
        exclude: /node_modules/,
        // określam wykluczenia
        use: 'babel-loader',
        // określam, jaki [loader]
        // ma być wykorzystany
        }
 ]
 // obecnie brak dodatkowych ustawień
 },
 plugins: [
    new HtmlWebpackPlugin({
    template: 'index.html',
    // wskazuję plik źródłowy
    filename: 'index.html'
    // określam nazwę dla pliku
    })
    ],
    devServer: {
        static: { 
          directory: path.resolve(__dirname, './assets'), 
          publicPath: '/assets'
        }
      }
}