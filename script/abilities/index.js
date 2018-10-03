import createGrave from './deathrattles/createGrave.js';
import spawnSlimes from './deathrattles/spawnSlimes.js';

export function getAbilityWithName(abilityName) {
	if (!abilities.hasOwnProperty(abilityName)) {
		throw Error(`No ability with name "${abilityName}" found.`);
	}

	return abilities[abilityName];
}

export const abilities = {
	createGrave,
	spawnSlimes,
};

console.log(abilities);
