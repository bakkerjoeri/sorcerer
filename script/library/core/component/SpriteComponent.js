export const SPRITE_COMPONENT_BLUEPRINT = {
	currentFrameIndex: 0,
	framesPerSecond: 1,
	isAnimationPaused: false,
	isAnimationLooping: true,
}

export default function SpriteComponent(properties) {
	return {
		...SPRITE_COMPONENT_BLUEPRINT,
		...properties,
	};
}
