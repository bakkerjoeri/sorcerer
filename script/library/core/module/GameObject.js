import createStateEntity from './../utility/createStateEntity';

export function createGameObject(components = {}) {
	return createStateEntity('gameObject', {
		components,
	});
}
