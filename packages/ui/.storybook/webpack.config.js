const path = require('path')
const autoprefixer = require('autoprefixer')

module.exports = {
  module: {
    rules: [
      {
        oneOf: [
          {
            exclude: /(node_modules|bower_components)/,

            test: /\.js?$/,
            use: {
              loader: 'babel-loader',
            },
          },
          {
            test: /\.md$/,
            use: 'raw-loader',
          },
          // "url" loader works like "file" loader except that it embeds assets
          // smaller than specified limit in bytes as data URLs to avoid requests.
          // A missing `test` is equivalent to a match.
          {
            loader: require.resolve('url-loader'),
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            options: {
              limit: 10000,
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
          // "postcss" loader applies autoprefixer to our CSS.
          // "css" loader resolves paths in CSS and adds assets as dependencies.
          // "style" loader turns CSS into JS modules that inject <style> tags.
          // In production, we use a plugin to extract that CSS to a file, but
          // in development "style" loader enables hot editing of CSS.
          {
            test: /\.css$/,
            use: [
              require.resolve('style-loader'),
              {
                loader: require.resolve('css-loader'),
                options: {
                  importLoaders: 1,
                },
              },
              {
                loader: require.resolve('postcss-loader'),
                options: {
                  // Necessary for external CSS imports to work
                  // https://github.com/facebookincubator/create-react-app/issues/2677
                  ident: 'postcss',
                  plugins: () => [
                    require('postcss-flexbugs-fixes'),
                    autoprefixer({
                      browsers: [
                        '>1%',
                        'last 4 versions',
                        'Firefox ESR',
                        'not ie < 9', // React doesn't support IE8 anyway
                      ],
                      flexbox: 'no-2009',
                    }),
                  ],
                },
              },
            ],
          },
          // "file" loader makes sure those assets get served by WebpackDevServer.
          // When you `import` an asset, you get its (virtual) filename.
          // In production, they would get copied to the `build` folder.
          // This loader don't uses a "test" so it will catch all modules
          // that fall through the other loaders.
          {
            // Exclude `js` files to keep "css" loader working as it injects
            // it's runtime that would otherwise processed through "file" loader.
            // Also exclude `html` and `json` extensions so they get processed
            // by webpacks internal loaders.
            exclude: [/\.js$/, /\.html$/, /\.json$/],
            loader: require.resolve('file-loader'),
            options: {
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    modules: [path.join(__dirname, '../src'), 'node_modules'],
  },
}

// module.exports = {
//   module: {
//     rules: [
//       {
//         test: /\.css$/,
//         use: [
//           require.resolve('style-loader'),
//           {
//             loader: require.resolve('css-loader'),
//             options: {
//               importLoaders: 1,
//             },
//           },
//           {
//             loader: require.resolve('postcss-loader'),
//             options: {
//               // Necessary for external CSS imports to work
//               // https://github.com/facebookincubator/create-react-app/issues/2677
//               ident: 'postcss',
//             },
//           },
//         ],
//       },
//     ],
//   },
// }
