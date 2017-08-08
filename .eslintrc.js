module.exports = {
	"extends": "eslint:recommended",
	"parser": "babel-eslint",
	"env": {
		"browser": true,
		"es6": true,
	},
	"rules": {
		"quotes": ["warn", "double"],
		"no-var": "warn",
		"prefer-template": "warn",
		"eqeqeq": "error"
	}
}
