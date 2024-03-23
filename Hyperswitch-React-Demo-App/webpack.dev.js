const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

const appHost = process.env.APP_HOST || 'localhost';

let devServer = {
  contentBase: path.join(__dirname, "dist"),
  host: appHost,
  hot: true,
  port: 9060,
  historyApiFallback: true,
  proxy: {
    "/payments": {
      target: "http://localhost:5252",
      changeOrigin: true,
      secure: true,
      pathRewrite: { "^/payments": "" },
    },
  },
  headers: {
    "Cache-Control": "max-age=31536000,must-revalidate",
  },
};

module.exports = merge([
  common("/payments"),
  {
    mode: "development",
    devServer: devServer,
  },
]);
