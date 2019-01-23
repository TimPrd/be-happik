module.exports = {
	"env": {
    "browser": true,
    "es6": true,
    "jest": true
  },
  "extends": "airbnb",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "plugins": [
    "react"
  ],
  "rules": {
    "import/no-extraneous-dependencies": [
      "error",
      {
        "devDependencies": [
          "**/*.test.js",
          "src/setupTests.js",
        ],
      },
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "always"
		],
		"react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }]
  },
};