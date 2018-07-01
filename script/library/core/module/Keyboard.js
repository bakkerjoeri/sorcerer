let keysBeingPressed = [];

window.addEventListener('keydown', (event) => {
	keysBeingPressed = addKeyToList(event.key, keysBeingPressed);
});

window.addEventListener('keyup', (event) => {
	keysBeingPressed = removeKeyFromList(event.key, keysBeingPressed);
});

export function isKeyPressed(keyName) {
	return keysBeingPressed.includes(keyName);
}

function addKeyToList(keyToAdd, keyList = []) {
	if (!keyList.includes(keyToAdd)) {
		return [...keyList, keyToAdd];
	}

	return keyList;
}

function removeKeyFromList(keyToRemove, keyList = []) {
	return keyList.filter((key) => {
		return key !== keyToRemove;
	});
}
