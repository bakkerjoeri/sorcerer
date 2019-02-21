export default function onChance(denominator) {
	return Math.floor(Math.random() * denominator + 1) === 1;
}
