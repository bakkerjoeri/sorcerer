import chai from 'chai';
import HealthComponent from './../script/component/HealthComponent.js';

let assert = chai.assert;

describe('HealthComponent', () => {
	describe('constructor', () => {
		it('returns an object with expected values', () => {
			let healthComponent = new HealthComponent({
				current: 4,
				maximum: 10,
			});

			assert.strictEqual(healthComponent.current, 4);
			assert.strictEqual(healthComponent.maximum, 10);
		})

		it('returns an object with `current` equal to given `maximum` if created without a `current` property', () => {
			let healthComponent = new HealthComponent({
				maximum: 10,
			});

			assert.property(healthComponent, 'current');
			assert.strictEqual(healthComponent.current, 10);
			assert.strictEqual(healthComponent.maximum, 10);
		});

		it('returns an object with `current` and `maximum` if created without properties', () => {
			let healthComponent = new HealthComponent();

			assert.property(healthComponent, 'current');
			assert.property(healthComponent, 'maximum');
		});
	});
});
