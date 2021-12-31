// Pick<T, K extends keyof T> 的作用是将某个类型中的子属性挑出来，变成包含这个类型部分属性的子类型。

interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview = Pick<Todo, "title" | "completed">;

const todo: TodoPreview = {
  title: "Clean room",
  completed: false,
};

// 那么如何定义一个 ConditionalPick 工具类型，支持根据指定的 Condition 条件来生成新的类型，对应的使用示例如下：
interface Example {
  a: string;
  b: string | number;
  c: () => void;
  d: {};
  e: string;
  f: number;
}

// 测试用例：
type StringKeysOnly = ConditionalPick<Example, string >;
//=> {a: string}

type ConditionalPick<T, U> = {
  [P in keyof T as T[P] extends U ? P : never]: T[P];
};
