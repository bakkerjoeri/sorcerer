import uuid from './uuid';

export default function createStateEntity(type = '', properties = {}) {
	let stateEntity = {...properties};

	if (!stateEntity.hasOwnProperty('id')) {
		stateEntity.id = uuid();
	}

	return stateEntity;
}
