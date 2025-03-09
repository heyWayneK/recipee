// KEEP THIS AS OLD OLD STYLE COMON JS MODULE
module.exports = {
  presets: ["@babel/preset-env", "@babel/preset-react", "@babel/preset-typescript"],
};

// // babel.config.js
// module.exports = (api) => {
//     const isTest = api.env("test");
//     return {
//       presets: [
//         isTest && "@babel/preset-env",
//         "@babel/preset-react",
//         "@babel/preset-typescript",
//       ].filter(Boolean),
//     };
//   };
