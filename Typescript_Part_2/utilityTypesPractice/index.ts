// Напишите функцию, которая принимает:
// 1) некие данные предполагаемо типа Т, но возможно не со всеми полями
// 2) функцию-дополнятор, которая принимает такие штуки как из п.1,
//    а возвращает полноценный объект типа Т
// ... как вы поняли, саму функцию писать не надо :)

// нас интересует только ее сигнатура.
type DataType<T> = (data: Partial<T>) => T;

function completeData<T>(data: Partial<T>, complementary: DataType<T>): T {
  return complementary(data);
}

// Напишите функцию, которая принимает:
// 1) некие данные предполагаемо типа Т (у которого поле id: string), 
//    но возможно без поля id
// 2) функцию-дополнятор, которая принимает такие штуки как из п.1, 
//    а возвращает полноценный объект типа Т
// ... как вы поняли, саму функцию писать не надо :) 
// нас интересует только ее сигнатура.
type Data<T> = (data: Partial<T>) => T;

type Item = {
  id: string;
  // Дополнительные поля типа T, если они есть.
};

function completeDataType<T extends Item>(
  data: Partial<T>,
  complementary: Data<T>
): T {
  return complementary(data);
}

// Напишите сигнатуру функции, которая принимает
// - некий класс
// - количество
// ...а возвращает массив экземпляров этого класса

class Rectangle {
  w!: number;
  h!: number;
}
class Circle {
  radius!: number;
}

// сделайте норм сигнатуру тут.
// НЕТ, Rectangle|Circle это не вариант, надо сделать универсальную функцию

type ClassType<T> = new () => T;

function build<T>(SOMECLASS: ClassType<T>, count: number): T[] {
  let a: T[] = [];
  for (let i = 0; i < count; i++) a.push(new SOMECLASS());

  return a;
}

let a: Rectangle[] = build(Rectangle, 10);
let b: Circle[] = build(Circle, 20);