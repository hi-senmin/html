// function fun(a: string | number, b: string | number) {
//   if (typeof a === 'string') {
//     return a + ':' + b; // no error but b can be number!
//   } else {
//     return a + b; // error as b can be number | string
//   }
// }

function fun(a: string, b: string): string;
function fun(a: number, b: number): number;

function fun(a: string | number, b: string | number): string | number {
  if (typeof a === "string" || typeof b === "string") {
    return a + ":" + b;
  } else {
    return a + b;
  }
}
