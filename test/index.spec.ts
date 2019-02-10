import { Uuid, UuidOptions } from '../src/index';

const options: UuidOptions = {
	length: 50,
	prefix: 'test-'
};

describe('Uuid Tests', () => {
	it('should be able to generate a uuid', async (done) => {
		expect(Uuid.generate).toBeDefined();
		const uuid: string = Uuid.generate(options);
		console.log(uuid);
		expect(uuid).toBeDefined();
		expect(uuid.length).toEqual(50);
		done();
	});
});
