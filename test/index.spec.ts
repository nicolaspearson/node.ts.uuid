import { Uuid, UuidOptions } from '../src/index';

const options: UuidOptions = {
	length: 50,
	prefix: 'test-'
};

describe('Uuid Tests', () => {
	it('should be able to generate a uuid', async (done) => {
		expect(Uuid.generate).toBeDefined();
		const uuid: string = Uuid.generate(options);
		expect(uuid).toBeDefined();
		expect(uuid.length).toEqual(50);
		expect(uuid).toContain('test-');
		done();
	});

	it('should be able to get the process id', async (done) => {
		expect(Uuid.generate).toBeDefined();
		const pid: number = Uuid.getPid();
		expect(pid).toBeDefined();
		expect(pid.toString().length).toEqual(5);
		done();
	});

	it('should be able to get the mac / ipv6 address', async (done) => {
		expect(Uuid.generate).toBeDefined();
		const address: number = Uuid.getAddress();
		expect(address).toBeDefined();
		expect(address.toString().length).toEqual(19);
		done();
	});

	it('should be able to get the current epoch time', async (done) => {
		expect(Uuid.generate).toBeDefined();
		const time: number = Uuid.getNow();
		expect(time).toBeDefined();
		expect(time.toString().length).toEqual(13);
		expect(time).toBeGreaterThan(1549823202077);
		done();
	});

	it('should be able to limit the length of the uuid', async (done) => {
		expect(Uuid.generate).toBeDefined();
		let uuid: string = Uuid.generate(options);
		expect(uuid).toBeDefined();
		expect(uuid.length).toEqual(50);
		expect(uuid).toContain('test-');

		uuid = Uuid.postProcessUuid(uuid, 30);
		expect(uuid.length).toEqual(30);
		done();
	});

	it('should be able to pad the uuid', async (done) => {
		expect(Uuid.generate).toBeDefined();
		let uuid: string = Uuid.generate(options);
		expect(uuid).toBeDefined();
		expect(uuid.length).toEqual(50);
		expect(uuid).toContain('test-');

		uuid = Uuid.postProcessUuid(uuid, 80);
		expect(uuid.length).toEqual(80);
		done();
	});
});
