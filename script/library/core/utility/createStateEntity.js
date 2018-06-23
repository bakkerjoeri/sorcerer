import uuid from './uuid';

export default function createStateEntity(type = '', properties = {}, defaultProperties = {}) {
	let entity = Object.assign({}, defaultProperties, properties);

	if (!entity.hasOwnProperty('id')) {
		entity.id = uuid();
	}

	return entity;
}
