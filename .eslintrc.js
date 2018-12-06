module.exports = {
	"env": {
		"browser": true,
		"es6": true,
	},
	"extends": [
		"eslint:recommended",
		"plugin:import/errors",
		"plugin:import/warnings",
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
