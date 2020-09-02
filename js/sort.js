// 排序算法


// 1、冒泡
function bubbleSort(arr) {
  let len = arr.length;
  // 遍历次数
  for (let i = 0; i < len - 1; i++) {
    for (let j = 0; j < len - i - 1; j++) {
      // 相邻两个数据
      if (arr[j] > arr[j + 1]) {
        // 交换
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr
}


// 2、选择排序   --  每次寻找将最小值交换位置
function selectionSort(arr) {
  let len = arr.length;
  let min = 0;//最小值的索引

  for (let i = 0; i < len - 1; i++) {
    min = i;

    for (let j = i + 1; j < len; j++) {
      if (arr[j] < arr[min]) {
        min = j;
      }
    }
    i === min ? null : [arr[i], arr[min]] = [arr[min], arr[i]];
  }

  return arr;
}


// 3、插入排序  
function insertionSort(arr) {
  let len = arr.length;

  for (let i = 1; i < len; i++) {
    let j = i;
    let temp = arr[i]
    // 往前遍历，直至首位或 第一个小于temp 的值即止
    while (j > 0 && arr[j - 1] > temp) {
      arr[j] = arr[j - 1];
      j--;
    }
    arr[j] = temp;
  }
  return arr;
}




let testArr = [2, 1, 3, 1, 45, 5125, 2, 5, 24, 2, 45, 3, 54, 6, 67, 2, 34];
//            [ 1, 1, 2, 2, 2, 2, 3, 3, 5, 6, 24, 34, 45, 45, 54, 67, 5125 ]
console.log('bubbleSort---->', bubbleSort(testArr));
console.log('selectionSort---->', selectionSort(testArr));
console.log('insertionSort---->', insertionSort(testArr));

