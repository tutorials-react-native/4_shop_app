module.exports = function(api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./src"],
          alias: {
            assets: ["./assets"],
            colors: ["./src/constants/colors"],
            apiConfig: ["./src/api/config.json"]
          }
        }
      ]
    ]
  };
};
