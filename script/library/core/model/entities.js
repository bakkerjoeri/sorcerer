export const addEntity = entity => state => ({
	...state,
	entities: {
		...state.entities,
		[entity.id]: entity,
	},
});

export const addComponentToEntity = (entityId, componentName, componentValue) => state => ({
	...state,
	entities: {
		...state.entities,
		[entityId]: {
			...state.entities[entityId],
			components: {
				...state.entities[entityId].components,
				[componentName]: componentValue,
			},
		},
	},
});

export const updateComponentOfEntity = (entityId, componentName, updatedComponentValue) => state => ({
	...state,
	entities: {
		...state.entities,
		[entityId]: {
			...state.entities[entityId],
			components: {
				...state.entities[entityId].components,
				[componentName]: {
					...state.entities[entityId].components[componentName],
					...updatedComponentValue,
				},
			},
		},
	},
});

export const removeComponentFromEntity = (entityId, componentName) => state => ({
	...state,
	entities: {
		...state.entities,
		[entityId]: {
			...state.entities[entityId],
			components: Object.keys(state.entities[entityId].components).reduce((newObject, key) => {
				if (key !== componentName) {
					return {
						...newObject,
						[key]: state.entities[entityId].components[key]
					}
				}

				return newObject;
			}, {}),
		},
	},
});

export const getEntityWithId = (state, entityId) => {
	return state.entities[entityId];
}

export const getAllEntities = state => {
	return Object.values(state.entities);
}

export const getEntitiesWithComponentNames = (state, componentNames = []) => {
	let allEntities = getAllEntities(state);

	if (componentNames.length === 0) {
		return allEntities;
	}

	return allEntities.filter((entity) => {
		return componentNames.every((componentName) => {
			return entity.components.hasOwnProperty(componentName);
		})
	});
}

export const getComponentValueForEntity = (state, entityId, componentName) => {
	return getEntityWithId(state, entityId).components[componentName];
}
