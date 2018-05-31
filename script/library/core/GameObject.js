import SpriteManager from 'core/SpriteManager';

const DEFAULT_OPTIONS = {
	spriteName: '',
	position: {
		x: 0,
		y: 0,
	},
	positioning: 'absolute',
	size: {
		width: 0,
		height: 0,
	},
	solid: true,
	visible: true,

};

export default class GameObject {
	constructor(options = {}) {
		options = Object.assign({}, DEFAULT_OPTIONS, options);

		this.setSprite(options.spriteName);
		this.setPosition(options.position);
		this.setPositioning(options.positioning);
		this.setSize(options.size);
		this.setSolidity(options.solid);
		this.setVisibility(options.visible);

		this.events = new Map();
	}

	step(time) {
		if (this.sprite) {
			this.sprite.step(time);
		}
	}

	draw(time, context, viewport) {
		if (
			this.hasOwnProperty('sprite')
			&& this.hasOwnProperty('position')
			&& this.position.hasOwnProperty('x')
			&& this.position.hasOwnProperty('y')
		) {
			let spriteDrawPosition;

			if (this.positioning = 'absolute') {
				spriteDrawPosition = {
					x: this.position.x + this.sprite.origin.x - (viewport.position.x - viewport.origin.x), // should be viewport relative
					y: this.position.y + this.sprite.origin.y - (viewport.position.y - viewport.origin.y), // should be viewport relative
				};
			} else {
				spriteDrawPosition = {
					x: this.position.x + this.sprite.origin.x,
					y: this.position.y + this.sprite.origin.y,
				}
			}

			this.sprite.draw(time, context, spriteDrawPosition);
		}
	}

	useSpriteWithName(spriteName) {
		if (spriteName.length > 0) {
			this.setSprite(SpriteManager.get(spriteName, 'SPRITE'));
		}
	}

	setSprite(sprite) {
		this.sprite = sprite;
	}

	setPosition(position) {
		this.position = position;
	}

	setPositioning(positioning) {
		this.positioning = positioning;
	}

	getPosition() {
		return this.position;
	}

	setSolidity(solid) {
		this.solid = solid;
	}

	setVisibility(visible) {
		this.visible = visible;
	}

	show() {
		this.setVisibility(true);
	}

	hide() {
		this.setVisibility(false);
	}

	isSolid() {
		return this.solid;
	}

	isVisible() {
		return this.visible;
	}

	setSize(size) {
		this.size = size;
	}

	getSize() {
		return this.size;
	}

	changePosition(change) {
		let currentPosition = this.getPosition();

		this.setPosition({
			x: currentPosition.x + change.x,
			y: currentPosition.y + change.y,
		});
	}

	addEventListener(type, callback, options = {}, useCapture = true) {
		/**
		 * Browsers that support the `passive` option are those that allow
		 * for the usage of the options parameter in event listeners.
		 *
		 * See: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
		 */
		if (doesSupportPassive()) {
			/**
			 * The following events should never `preventDefault()`, due to heavy
			 * performance impact. The `passive` option enforces this, and
			 * tells the browser not to expect any `preventDefault()``.
			 *
			 * See: https://developers.google.com/web/tools/lighthouse/audits/passive-event-listeners
			 */
			if (type === 'wheel' || type === 'mousewheel' || type === 'touchstart' || type === 'touchmove') {
				options.passive = true;
			}

			window.addEventListener(type, callback, options, useCapture);
		} else {
			window.addEventListener(type, callback, useCapture);
		}

		return addEventToRegistry(this.events, type, callback, options, useCapture);
	}

	removeEventListener(eventIdentifier) {
		if (this.events.has(eventIdentifier)) {
			let eventToRemove = this.events.get(eventIdentifier);

			window.removeEventListener(
				eventToRemove.get('type'),
				eventToRemove.get('callback'),
				eventToRemove.get('options'),
				eventToRemove.get('useCapture'),
			);

			this.events.delete(eventIdentifier);
		}
	}

	removeAllEventListeners() {
		for (let eventIdentifier of this.events.keys()) {
			this.removeEvent(eventIdentifier);
		}
	}
}

function addEventToRegistry(eventRegistry, type, callback, options, useCapture) {
	let eventIdentifier = createUniqueIdentifierForMap(eventRegistry);

	eventRegistry.set(eventIdentifier, new Map([
		['type', type],
		['callback', callback],
		['options', options],
		['useCapture', useCapture],
	]));

	return eventIdentifier;
}

function createUniqueIdentifierForMap(map, length = 6) {
	const HASH_STRING_START = 2;
	const HASH_STRING_END = 2 + length;

	let randomIdentifierString = Math.random().toString(36).substring(HASH_STRING_START, HASH_STRING_END);

	if (map.has(randomIdentifierString)) {
		return createUniqueIdentifierForMap(map, length);
	}

	return randomIdentifierString;
}

/**
 * Check if the browser knows about the `passive` option and actively looks for it.
 *
 * See: https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md#feature-detection
 */
function doesSupportPassive() {
	let supportsPassive = false;

	try {
		let options = Object.defineProperty({}, 'passive', {
			get: function() {
				supportsPassive = true;
			}
		});

		window.addEventListener('test', null, options);
		window.removeEventListener('test', null, options);
	} catch (e) {
		// Do nothing
	}

	return supportsPassive;
}
