type initialValue<I> = Record<string, I>;
type resultingValue<R> = Record<string, R>;

function mapObject<I, R>(
  obj: initialValue<I>,
  transformer: (value: I) => R
): resultingValue<R> {
  const result: resultingValue<R> = {};

  for (const key in obj) {
    result[key] = transformer(obj[key]);
  }

  return result;
}

const originalObj = { roma: 5, vasya: 2, oleg: 1 };
const transformedObj = mapObject(originalObj, (x) => x > 2);

console.log(`transformedObj: ${JSON.stringify(transformedObj)}`);
