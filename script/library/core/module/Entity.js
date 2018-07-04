import createStateEntity from './../utility/createStateEntity';

export function createEntity(components = {}) {
	return createStateEntity('entity', {
		components,
	});
}
