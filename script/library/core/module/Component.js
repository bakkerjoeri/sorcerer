import createStateEntity from './../utility/createStateEntity';

export function createComponent(name, value) {
	return createStateEntity('entity', {
		name,
		value,
	});
}
