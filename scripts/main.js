require('../style/main.scss');

import Entity from './Entity';
import Sprite from './Sprite';

const canvas = document.querySelector('.canvas__sorcerer');
const context = canvas.getContext('2d');

context.fillStyle = '#000';
context.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);

let playerImage = new Image();
playerImage.src = '../assets/character.png';

let playerEntity = new Entity({
	sprite: new Sprite(playerImage, 16, 16),
	position: {
		x: 16,
		y: 16,
	},
});

playerEntity.draw(context);
