"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function mapObject(obj, transformer) {
    const result = {};
    for (const key in obj) {
        result[key] = transformer(obj[key]);
    }
    return result;
}
const originalObj = { roma: 5, vasya: 2, oleg: 1 };
const transformedObj = mapObject(originalObj, (x) => x > 2);
console.log(`transformedObj: ${JSON.stringify(transformedObj)}`);
