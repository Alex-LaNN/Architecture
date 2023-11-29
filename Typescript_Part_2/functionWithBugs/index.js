"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function summ(a) {
    const x = Object.keys(a).map((k) => {
        const elem = a[k];
        if (elem === undefined)
            return 2022;
        if (typeof elem.cvalue === "string")
            return +elem.cvalue || 2022;
        if (typeof elem.cvalue === "object")
            return summ(elem.cvalue);
        return elem.cvalue;
    });
    let sum = 0;
    for (let i = 0; i < x.length; i++) {
        sum += x[i];
    }
    return sum;
}
const result = summ({
    hello: { cvalue: 1 },
    world: { cvalue: { yay: { cvalue: "2" } } },
    and: { cvalue: { tre: { cvalue: "ups" } } },
});
console.log(`result: ${result}`);
