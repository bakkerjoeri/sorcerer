const topics = new Map();

export default class PubSub {
	static subscribe(topic, callback) {
		if (!topics.has(topic)) {
			topics.set(topic, []);
		}

		let topicCallbacks = topics.get(topic);
		topicCallbacks.push(callback);
	}

	static publish(topic, data) {
		if (topics.has(topic)) {
			topics.get(topic).forEach((callback) => {
				callback(data);
			});
		}
	}
}
