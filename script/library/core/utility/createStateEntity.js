import uuid from './uuid';

export default function createStateEntity(type = '', properties = {}, defaultProperties = {}) {
	let stateEntity = Object.assign({}, defaultProperties, properties);

	if (!stateEntity.hasOwnProperty('id')) {
		stateEntity.id = uuid();
	}

	return stateEntity;
}
