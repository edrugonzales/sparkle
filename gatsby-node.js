// Create dynamic routing for products
exports.onCreatePage = ({ page, actions }) => {
  const { createPage } = actions
  if (page.path === `/`) {
    page.matchPath = `/*`
    createPage(page)
  }

  // page.matchPath is a special key that's used for matching pages
  // only on the client.
  // if (page.path.match(/^\/Homemade/)) {
  //   page.matchPath = `/Homemade/*`

  //   // Update the page.
  //   createPage(page)
  // }
  // if (page.path.match(/^\/Homemade/)) {
  //   page.matchPath = '/Homemade/*';
  //   createPage(page);
  // }
}

// exports.onCreateWebpackConfig = ({
//   stage,
//   actions,
//   getConfig
// }) => {
//   if (stage === 'build-html') {
//     actions.setWebpackConfig({
//       externals: getConfig().externals.concat(function(context, request, callback) {
//         const regex = /^@?firebase(\/(.+))?/;
//         // exclude firebase products from being bundled, so they will be loaded using require() at runtime.
//         if (regex.test(request)) {
//           return callback(null, 'commonjs ' + request); // <- use commonjs!
//         }
//         callback();
//       })
//     });
//   }
// };

// exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
//   if (stage === "build-html") {
//     actions.setWebpackConfig({
//       module: {
//         rules: [
//           {
//             test: /bad-module/,
//             use: loaders.null(),
//           },
//         ],
//       },
//     })
//   }
// }

exports.onCreateWebpackConfig = ({
  stage,
  actions,
  getConfig
}) => {
  if (stage === 'build-html') {
    actions.setWebpackConfig({
      externals: getConfig().externals.concat(function(context, request, callback) {
        const regex = /^@?firebase(\/(.+))?/;
        // exclude firebase products from being bundled, so they will be loaded using require() at runtime.
        if (regex.test(request)) {
          return callback(null, 'umd ' + request);
        }
        callback();
      })
    });
  }
};