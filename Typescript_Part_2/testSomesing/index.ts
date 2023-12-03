
type voidFunc = () => void;

const f1: voidFunc = () => {
  return "string";
};

const f2: voidFunc = () => true;

const f3: voidFunc = function () {
  return 555;
};

function fv1(): unknown {
  const test = f1();
  const test1 = f2();
  const test2 = f3();
  const res = [test, test1, test2];
  // if(test1) return res -> "Выражение типа "void" не может быть проверено на истинность."
  if (res) return res; // `Выражение типа "void[]"` работает!
}

const nothing: string = fv1() + " Or somesing?...";

console.log(`f1: ${f1()}`);
console.log(`f2: ${f2()}`);
console.log(`f3: ${f3()}`);
console.log(`fv1: ${fv1()}`);
console.log(`nothing: "${nothing}"`);

interface Todo {
  title: string | number;
  description: string;
  completed?: boolean;
  createdAt?: number;
}

function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) {
  return { ...todo, ...fieldsToUpdate };
}

const todo1 = {
  title: "organize desk",
  description: "clear clutter",
};

const todo2 = updateTodo(todo1, {
  description: "throw out trash",
});

console.log(`todo2: "${JSON.stringify(todo2)}"`);

type TodoPreview = Pick<Todo, "title" | "completed">;

const todo3: TodoPreview = {
  title: "Clean room",
  completed: false,
};

console.log(`todo3: "${JSON.stringify(todo3)}"`);

type TodoPreview1 = Omit<Todo, "description">;

const todo4: TodoPreview1 = {
  title: "Clean room",
  completed: false,
  createdAt: 1615544252770,
};

todo4;

type TodoInfo = Omit<Todo, "completed" | "createdAt">;

const todoInfo: TodoInfo = {
  title: "Pick up kids",
  description: "Kindergarten closes at 5pm",
};

todoInfo;

console.log(`todo4: "${JSON.stringify(todo4)}"`);
console.log(`todoInfo: "${JSON.stringify(todoInfo)}"`);

type T = string | number | string[] | Function | null | undefined;
type T0 = NonNullable<T>;

const test: T0 = nothing;
