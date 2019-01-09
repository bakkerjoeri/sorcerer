import uuid from './uuid.js';

export default function createStateEntity(type = '', properties = {}) {
	if (!properties.hasOwnProperty('id')) {
		if (type) {
			properties.id = `${type}.${uuid()}`;
		} else {
			properties.id = `${uuid()}`;
		}
	}

	return properties;
}
