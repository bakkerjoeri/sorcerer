module.exports = {
	"parser": "babel-eslint",
	"env": {
		"browser": true,
		"es6": true,
	},
	"extends": [
		"eslint:recommended",
	],
	"rules": {
		"quotes": [
			"warn",
			"single",
		],
		"no-var": "warn",
		"prefer-template": "warn",
		"eqeqeq": "error",
	}
}
