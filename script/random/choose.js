export default function choose(choices) {
	if (choices.length === 0) {
		throw new Error('Cannot choose from zero choices.');
	}

	return choices[Math.floor(Math.random() * ((choices.length - 1) + 1))];
}
