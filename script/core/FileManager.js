export default class FileManager {
	static loadFile(url, type) {
		if (type === 'json') {
			return loadJSON(url);
		}

		throw new Error(`Unable to load files of type "${type}"`)
	}
}

function loadJSON(url) {
	return loadXhr(url, (data) => {
		if (typeof data === 'string') {
			return JSON.parse(data)
		}

		return data;
	});
}

function loadXhr(url, dataParse = (data) => {return data}) {
	let request = new XMLHttpRequest();
	request.open('GET', url, true);
	request.send();

	return new Promise((resolve = () => {}, reject = () => {}, always = () => {}) => {
		request.onload = () => {
			let data = dataParse(request.response);

			resolve(data);
			always(request);
		};

		request.onerror = () => {
			reject(request);
			always(request);
		};

		request.onabort = () => {
			reject(request);
			always(request);
		};
	});
}
