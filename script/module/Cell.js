export default class Cell {
	constructor(position, weight = Infinity, passable = true) {
		this.position = position;

		this.setWeight(weight);
		this.setPassability(passable);
	}

	setWeight(weight) {
		this.weight = weight;
	}

	resetWeight() {
		this.setWeight(Infinity);
	}

	setPassability(passable) {
		this.passable = passable;
	}
}
