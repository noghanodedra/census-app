module.exports = function(api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            components: "./src/components",
            constants: "./src/constants",
            features: "./src/features",
            helpers: "./src/helpers",
            navigation: "./src/navigation",
            styles: "./src/styles",
            contexts: "./src/contexts/",
            hooks: "./src/hooks/",
          },
        },
      ],
    ],
    env: {
      production: {
        plugins: ["react-native-paper/babel"],
      },
    },
  };
};
