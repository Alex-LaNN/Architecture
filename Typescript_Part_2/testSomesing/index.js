"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const f1 = () => {
    return "string";
};
const f2 = () => true;
const f3 = function () {
    return 555;
};
function fv1() {
    const test = f1();
    const test1 = f2();
    const test2 = f3();
    const res = [test, test1, test2];
    if (res)
        return res;
}
const nothing = fv1() + " Or somesing?...";
console.log(`f1: ${f1()}`);
console.log(`f2: ${f2()}`);
console.log(`f3: ${f3()}`);
console.log(`fv1: ${fv1()}`);
console.log(`nothing: "${nothing}"`);
function updateTodo(todo, fieldsToUpdate) {
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
const todo3 = {
    title: "Clean room",
    completed: false,
};
console.log(`todo3: "${JSON.stringify(todo3)}"`);
const todo4 = {
    title: "Clean room",
    completed: false,
    createdAt: 1615544252770,
};
todo4;
const todoInfo = {
    title: "Pick up kids",
    description: "Kindergarten closes at 5pm",
};
todoInfo;
console.log(`todo4: "${JSON.stringify(todo4)}"`);
console.log(`todoInfo: "${JSON.stringify(todoInfo)}"`);
const test = [""];
console.log(typeof test);
