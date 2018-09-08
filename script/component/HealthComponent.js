export const HEALTH_COMPONENT_BLUEPRINT = {
	current: 1,
	maximum: 1,
}

export default function HealthComponent(properties = {}) {
	// If no current health is given, current health will be equal to the
	// provided maximum health.
	if (!properties.hasOwnProperty('current') && properties.hasOwnProperty('maximum')) {
		properties.current = properties.maximum;
	}

	return {
		...HEALTH_COMPONENT_BLUEPRINT,
		...properties,
	};
}
