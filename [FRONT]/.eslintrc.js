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
    "jsx-a11y/label-has-associated-control": [ 2, {
      "labelComponents": ["CustomInputLabel"],
      "labelAttributes": ["label"],
      "controlComponents": ["CustomInput"],
      "depth": 3,
    }],
    "jsx-a11y/label-has-for": [ 2, {
      "components": [ "Label" ],
      "required": {
          "every": [ "nesting", "id" ]
      },
      "allowChildren": false
    }],
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
