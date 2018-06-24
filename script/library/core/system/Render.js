import System from './../module/System';

export default class RenderSystem extends System {
	constructor() {
		super(['sprite', 'position'], renderEntity);
	}
}

function renderEntity(entity, game) {
	let {sprite, position} = entity.components;

	game.context.drawImage(
		getImageFromPath(sprite.source),
		0, 0,
		sprite.size.width, sprite.size.height,
		position.x, position.y,
		sprite.size.width, sprite.size.height
	);
}

const imageByPath = {};

function getImageFromPath(filePath) {
	if (!imageByPath[filePath]) {
		let image = new Image();
		image.src = filePath;
		imageByPath[filePath] = image;
	}

	return imageByPath[filePath];
}
