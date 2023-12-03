"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function completeData(data, complementary) {
    return complementary(data);
}
function completeDataType(data, complementary) {
    return complementary(data);
}
class Rectangle {
}
class Circle {
}
function build(SOMECLASS, count) {
    let a = [];
    for (let i = 0; i < count; i++)
        a.push(new SOMECLASS());
    return a;
}
let a = build(Rectangle, 10);
let b = build(Circle, 20);
