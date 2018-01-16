export default class FileManager {
	static loadFile(url, type) {
		if (type === 'json') {
			return loadJSON(url);
		}

		throw new Error(`Unable to load files of type "${type}"`)
	}
}

function loadJSON(url) {
	return fetch(url, {
		method: 'GET',
		headers: new Headers({
			'Content-Type': 'application/json'
		}),
	}).then((response) => {
		return response.json();
	});
}
