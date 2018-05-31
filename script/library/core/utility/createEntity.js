import getUniqueId from './../utility/getUniqueId';

export default function createEntity(type = '', properties = {}, defaultProperties = {}) {
	let entity = Object.assign({}, defaultProperties, properties);

	if (!entity.hasOwnProperty('id')) {
		entity.id = getUniqueId(type);
	}

	return entity;
}
