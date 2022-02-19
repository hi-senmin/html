type Foo = {
  a: number;
  b?: string;
  c: boolean;
};

// type Partial<T> = {
//   [P in keyof T]?: T[P];
// };

// 1 -----
// type SomeOptional = {
// 	a?: number; // 该属性已变成可选的
// 	b?: string; // 保持不变
// 	c: boolean;
// }

type Simplify<T> = {
  [P in keyof T]: T[P];
};

type SomeOptional = SetOptional<Foo, "a" | "c">;

type SetOptional<T, K extends keyof T> = Simplify<{
  [P in K]?: T[P];
} & {
  [P in Exclude<keyof T, K>]: T[P];
}>

// const obj1: SomeOptional = {
//   a: 1,
//   b: "2",
//   c: false,
// };

// ----------

type Foo2 = {
  a?: number;
  b: string;
  c?: boolean;
};

// 测试用例
type SomeRequired = SetRequired<Foo2, "a" | "c">;
// type SomeRequired = {
// 	a?: number;
// 	b: string; // 保持不变
// 	c: boolean; // 该属性已变成必填
// }


type SetRequired<T, K extends keyof T> = Simplify<
  Pick<T, Exclude<keyof T, K>> & Required<Pick<T, K>>
>;
