module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      // Required for expo-router
      "expo-router/babel",
      [
        "module-resolver",
        {
          alias: {
            api: "./api",
            components: "./components",
            constants: "./constants",
            pages: "./pages",
            hooks: "./hooks",
          },
        },
      ],
      "react-native-reanimated/plugin",
    ],
  };
};
