module.exports = {
	"extends": "eslint:recommended",
	"parser": "babel-eslint",
	"env": {
		"browser": true,
		"es6": true,
		"amd": true
	},
	"rules": {
		"quotes": ["warn", "single"],
		"no-var": "warn",
		"prefer-template": "warn",
		"eqeqeq": "error"
	}
}
