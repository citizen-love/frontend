var path = require("path");
var PrerenderSpaPlugin = require("prerender-spa-plugin");
const Renderer = PrerenderSpaPlugin.PuppeteerRenderer;

module.exports = {
  transpileDependencies: ["vuetify"],

  pluginOptions: {
    i18n: {
      locale: "en",
      fallbackLocale: "en",
      localeDir: "locales",
      enableInSFC: false
    }
  },

  configureWebpack: {
    devServer: {
      allowedHosts: [
        ".local" // make it available from iOS
      ]
    },

    plugins: [
      // https://github.com/jantimon/favicons-webpack-plugin

      ...(process.env.NODE_ENV !== "production"
        ? []
        : [
            new PrerenderSpaPlugin({
              staticDir: path.join(__dirname, "/dist"),
              routes: ["/", "/helloworld"],

              minify: {
                // https://github.com/kangax/html-minifier#options-quick-reference
                collapseBooleanAttributes: true,
                collapseWhitespace: true,
                conservativeCollapse: true,
                decodeEntities: true,
                html5: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                removeComments: true
              },

              renderer: new Renderer({
                // required due to occasional MaxListenersExceededWarning
                maxConcurrentRoutes: 3
              })
            })
          ])
    ]
  }
};
