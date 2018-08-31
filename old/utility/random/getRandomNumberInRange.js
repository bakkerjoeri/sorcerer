export default function getRandomNumberInRange(lowerBound, upperBound) {
	return Math.floor(Math.random() * (upperBound + 1 + lowerBound))
}
