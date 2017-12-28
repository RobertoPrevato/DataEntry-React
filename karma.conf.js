const istanbul = require("browserify-istanbul");
const isparta = require("isparta");

module.exports = config => {
  config.set({

    basePath: "./",

    singleRun: true,

    frameworks: ["jasmine", "browserify", "intl-shim"],

    preprocessors: {
      "app/scripts/*.js": ["browserify"],
      "app/tests/**/*.spec.js": ["browserify"],
      "app/scripts/**/*.js": ["browserify"],
      "app/tests/**/*.spec.js": ["browserify"]
    },

    browsers: ["PhantomJS"],

    reporters: ["progress", "coverage"],

    autoWatch: true,

    browserify: {
      debug: true,
      extensions: [".js"],
      transform: [
        "babelify",
        istanbul({
          instrumenter: isparta,
          ignore: ["**/node_modules/**", "**/test/**"]
        })
      ]
    },

    urlRoot: "/__karma__/",

    files: [
      "node_modules/babel-polyfill/dist/polyfill.js",
      "node_modules/intl/locale-data/jsonp/en-GB.js",
      "app/scripts/*.js",
      "app/tests/**/*.spec.js",
      "app/scripts/**/*.js"
    ],

    exclude: [
      "app/scripts/libs/*.js"
    ]

  });
};
