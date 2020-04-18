const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  // publicPath: './',
  publicPath: process.env.NODE_ENV === 'production' ? '/cool-website' : './',
  outputDir: process.env.NODE_ENV === 'production' ? 'doc' : 'dist',
  // outputDir: 'dist',
  devServer: {
    open: true, // Automatically pop up the browser page
    https: false, // Do not use https protocol
    hotOnly: true, // Open hot update
  },

  css: {
    loaderOptions: {
      postcss: {
        // eslint-disable-next-line global-require
        plugins: [require('postcss-px2rem')({ remUnit: 192 })],
      },
    },
  },

  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src'),
      },
    },
  },

  chainWebpack: (config) => {
    config.plugin('html').tap((args) => {
      args[0].title = 'cool-squad';
      return args;
    });

    // set svg-sprite-loader
    const svgRule = config.module.rule('svg');
    svgRule.uses.clear();
    svgRule
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
      });

    // set pre-scss
    const oneOfsMap = config.module.rule('scss').oneOfs.store;
    oneOfsMap.forEach((item) => {
      item
        .use('sass-resources-loader')
        .loader('sass-resources-loader')
        .options({
          resources: [
            './src/assets/styles/abstracts/mixins.scss',
            './src/assets/styles/abstracts/variables.scss',
            './src/assets/styles/abstracts/functions.scss',
          ],
        })
        .end();
    });
  },
};
