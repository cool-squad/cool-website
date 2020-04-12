const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: './',
  outputDir: 'dist',
  devServer: {
    // TODO: Change the comments to English.
    open: true, // 是否自动弹出浏览器页面
    https: false, // 是否使用https协议
    hotOnly: true, // 是否开启热更新
    // proxy: {
    //     '/api': {
    //       target: 'http://192.168.2.100:9087',
    //       changeOrigin: true,
    //       pathRewrite: {
    //         '^/api': '/',
    //       },
    //     },
    //   },
  },

  css: {
    loaderOptions: {
      postcss: {
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

    // scss 预处理
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
