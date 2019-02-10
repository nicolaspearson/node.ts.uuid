# Node Typescript UUID

[![License][license-image]][license-url]
[![Current Version](https://img.shields.io/npm/v/node-ts-uuid.svg)](https://www.npmjs.com/package/node-ts-uuid)
[![npm](https://img.shields.io/npm/dw/node-ts-uuid.svg)](https://www.npmjs.com/package/node-ts-uuid)
![](https://img.shields.io/bundlephobia/min/node-ts-uuid.svg?style=flat)

[license-url]: https://opensource.org/licenses/MIT
[license-image]: https://img.shields.io/npm/l/make-coverage-badge.svg

A simple uuid generator. The generator uses the MAC address / IPv6 address + the process id + the current time to ensure a unique id is generated. The length of the uuid can be specified, this will either increase or decrease the number of characters in the uuid. If the uuid needs to be padded to create a longer uuid, a bitwise operation is used to generate the unique characters. A prefix may also specified.

## Test Coverage

![Coverage lines](https://raw.githubusercontent.com/nicolaspearson/node.ts.uuid/master/coverage/badge-lines.svg?sanitize=true)
![Coverage functions](https://raw.githubusercontent.com/nicolaspearson/node.ts.uuid/master/coverage/badge-functions.svg?sanitize=true)
![Coverage branches](https://raw.githubusercontent.com/nicolaspearson/node.ts.uuid/master/coverage/badge-branches.svg?sanitize=true)
![Coverage statements](https://raw.githubusercontent.com/nicolaspearson/node.ts.uuid/master/coverage/badge-statements.svg?sanitize=true)

## Installation

`npm install node-ts-uuid --save`

## Usage

```typescript
import { Uuid, UuidOptions } from 'node-ts-uuid';

const options: UuidOptions = {
	length: 50,
	prefix: 'test-'
};

export function getUuid() {
	const uuid: string = Uuid.generate(options);
	console.log(uuid);
	return uuid;
}
```

Will generate a uuid similar to: `test-6xke0ccwg0k00emrjrz81gu8a63657918908addf9942c`

### Methods

### Options
