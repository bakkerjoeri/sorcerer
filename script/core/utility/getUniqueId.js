let nextId = 0;

export default function getUniqueId() {
	let uniqueId = nextId;
	nextId = nextId + 1;

	return uniqueId;
}
