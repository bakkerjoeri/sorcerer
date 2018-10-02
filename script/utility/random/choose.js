import getRandomNumberInRange from './getRandomNumberInRange.js';

export default function choose(choices) {
	if (choices.length === 0) {
		throw new Error('Cannot choose from 0 choices.');
	}

	return choices[getRandomNumberInRange(0, choices.length - 1)];
}
