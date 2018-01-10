export default class FileManager {
	static loadFile(url, type) {
		if (type === 'json') {
			return loadJSON(url);
		}
	}
}

function loadJSON(url) {
	let request = new XMLHttpRequest();
	request.open('GET', url, true);
	request.responseType = 'json';
	request.send();

	return new Promise((resolve = () => {}, reject = () => {}, always = () => {}) => {
		request.onload = () => {
			let data = request.response;

			if (typeof data === 'string') {
				data = JSON.parse(data);
			}

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

function createRequest(method, url) {
	let request = new XMLHttpRequest();

	request.open(method, url);

	return request;
}
