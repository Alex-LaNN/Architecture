interface A {
  [a: string]: undefined | { cvalue: undefined | string | number | A };
}

function summ(a: A) {
  const x = Object.keys(a).map((k) => {
    const elem = a[k];
    if (elem === undefined) return 2022;
    if (typeof elem.cvalue === "string") return +elem.cvalue || 2022;
    if (typeof elem!.cvalue === "object") return summ(elem.cvalue);
    return elem.cvalue as number;
  });
  let sum = 0;
  for (let i = 0; i < x.length; i++) {
    sum += x[i];
  }
  return sum;
}

const result = summ({
  hello: { cvalue: 1 },                         // 1
  world: { cvalue: { yay: { cvalue: "2" } } },  // 2
  and: { cvalue: { tre: { cvalue: "ups" } } },  // 2022
});

console.log(`result: ${result}`)                // 2025 !!!
