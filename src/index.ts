import * as os from 'os';

interface UuidOptions {
	length?: number;
	prefix?: string;
}

class Uuid {
	private static lastTime: number;

	/**
	 * Generates a UUID using the IPv6 / Mac Address, the process id,
	 * and the current time. Optionally add a prefix, and limit / pad
	 * the uuid to be a specific length.
	 *
	 * @param options optional uuid options object
	 * @returns string
	 */
	public static generate(options?: UuidOptions): string {
		const address = this.getAddress().toString(36);
		const pid = this.getPid().toString(36);
		const now = this.getNow().toString(36);

		const length: number | undefined = options && options.length ? options.length : undefined;
		const prefix = options && options.prefix ? options.prefix : '';
		const uuid = prefix + address + pid + now;
		return this.postProcessUuid(uuid, length);
	}

	/**
	 * Returns the running process id or a
	 * randomly generated 5 digit number.
	 *
	 * @returns number
	 */
	public static getPid(): number {
		const pid: number = process && !process.pid ? process.pid : Math.floor(Math.random() * 100000);
		return pid;
	}

	/**
	 * Returns the MAC Address or IPv6 Address, if neither are
	 * available a randomly generated 8 digit number is returned.
	 *
	 * @returns number
	 */
	public static getAddress(): number {
		let address: number = Math.floor(Math.random() * 100000000);
		const networkInterfaces = os.networkInterfaces();
		interfaceLoop: for (const key in networkInterfaces) {
			const netInterface = networkInterfaces[key];
			const length = netInterface.length;
			for (let i = 0; i < length; i++) {
				if (netInterface[i].mac && netInterface[i].mac !== '00:00:00:00:00:00') {
					// Using Mac Address
					address = Number(netInterface[i].mac.replace(/\:|\D+/gi, ''));
					break interfaceLoop;
				} else if (!netInterface[i].internal && netInterface[i].address.indexOf('fe80::') === 0) {
					// Using IPv6 Address
					const ip6: number[] = netInterface[i].address
						.slice(6)
						.split(/:/)
						.map((value: string) => {
							return parseInt(value, 16);
						});
					if (ip6 && ip6.length > 1) {
						address = Number(ip6.join(''));
						break interfaceLoop;
					}
				}
			}
		}
		return address;
	}

	/**
	 * Returns the current epoch time or the previously
	 * returned epoch time incremented by 1.
	 *
	 * @returns number
	 */
	public static getNow(): number {
		const time = Date.now();
		const last = this.lastTime || time;
		this.lastTime = time > last ? time : last + 1;
		return this.lastTime;
	}

	/**
	 * Pads / limits the length of the provided uuid
	 * if the length is shorter than desired a bitwise
	 * operation provides the randomly generated characters.
	 *
	 * @param uuid The uuid
	 * @param length The desired length of the uuid
	 * @returns string
	 */
	public static postProcessUuid(uuid: string, length?: number): string {
		if (length && length > 0) {
			const diffLength = length - uuid.length;
			if (diffLength > 0) {
				const mask = new Array(diffLength + 1).join('x');
				const date = Date.now();
				// tslint:disable no-bitwise
				return (
					uuid +
					mask.replace(/[x]/g, (placeholder: string) => {
						const random = (date + Math.random() * 16) % 16 | 0;
						return (placeholder === 'x' ? random : (random & 0x3) | 0x8).toString(16);
					})
				);
			}
			return uuid.substring(0, length);
		}
		return uuid;
	}
}

export { UuidOptions, Uuid };
