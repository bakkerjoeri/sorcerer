require('../style/main.scss');

const canvas = document.querySelector('.canvas__sorcerer');
const context = canvas.getContext('2d');

context.fillStyle = '#000';
context.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
