export default class Viewport {
	constructor(canvas, position, size) {
		this.useCanvas(canvas);
		this.position = position;
		this.setSize(size);

		this.startUpdating();
	}

	startUpdating() {
		window.requestAnimationFrame(this.update.bind(this));
	}

	update(time) {
		this.step(time);
		this.draw(time);

		window.requestAnimationFrame(this.update.bind(this));
	}

	step(time) {
		this.room.entities.forEach((entity) => {
			entity.step(time);
			entity.sprite.step(time);
		});
	}

	draw(time) {
		// remove viewport drawings
		this.clearDrawing(this.context);

		// draw background
		this.room.drawBackground(this.context);

		this.room.entities.forEach((entity) => {
			entity.sprite.draw(this.context, calculatePositionInViewportFromPositionInRoom({
				x: entity.position.x,
				y: entity.position.y
			}, this));
		});
	}

	showRoom(room) {
		this.room = room;
	}

	useCanvas(canvas) {
		this.canvas = canvas;
		this.context = canvas.getContext('2d');

		if (this.size) {
			changeCanvasToSize(canvas, this.size);
		}
	}

	setSize(size) {
		this.size = size;

		if (this.canvas) {
			changeCanvasToSize(this.canvas, size);
		}
	}

	clearDrawing(context) {
		context.clearRect(
			0,
			0,
			this.size.width,
			this.size.height
		);
	}
}

function changeCanvasToSize(canvas, size) {
	canvas.width = size.width;
	canvas.height = size.height;
}

function calculatePositionInViewportFromPositionInRoom(positionInRoom, viewport) {
	return {
		x: positionInRoom.x - viewport.position.x,
		y: positionInRoom.y - viewport.position.y
	}
}
