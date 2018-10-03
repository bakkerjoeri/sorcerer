module.exports = {
	"env": {
		"browser": true,
		"es6": true,
	},
	"extends": [
		"eslint:recommended",
	],
	"parserOptions": {
		"ecmaVersion": 2018,
		"sourceType": "module",
	},
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
