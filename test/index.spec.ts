import * as os from 'os';

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
		expect(pid.toString().length).toBeGreaterThanOrEqual(2);
		done();
	});

	it('should be able to get the mac / ipv6 address', async (done) => {
		expect(Uuid.generate).toBeDefined();
		const address: number = Uuid.getAddress();
		expect(address).toBeDefined();
		expect(address.toString().length).toBeGreaterThanOrEqual(8);
		done();
	});

	it('should be able to get the ipv6 address from the network interface', async (done) => {
		expect(Uuid.generate).toBeDefined();
		const networkInterfaces = os.networkInterfaces();
		for (const key in networkInterfaces) {
			const netInterface: os.NetworkInterfaceInfo[] | undefined = networkInterfaces[key];
			const ipv6: number[] = Uuid.getIpV6(netInterface![0]);
			expect(ipv6[0]).toBeGreaterThanOrEqual(0);
		}
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

	it('should be able to keep the length of the uuid', async (done) => {
		expect(Uuid.generate).toBeDefined();
		let uuid: string = Uuid.generate(options);
		expect(uuid).toBeDefined();
		expect(uuid.length).toEqual(50);
		expect(uuid).toContain('test-');

		uuid = Uuid.postProcessUuid(uuid);
		expect(uuid.length).toEqual(50);
		done();
	});
});
