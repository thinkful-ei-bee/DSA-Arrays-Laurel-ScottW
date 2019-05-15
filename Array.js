'use strict';

const Memory = require('./memory');
const memory = new Memory();

class Array {
  constructor() {
    this.length = 0;
    this._capacity = 0;
    this.ptr = memory.allocate(this.length);
  }
  push(value) {
    if (this.length >= this._capacity) {
      this._resize((this.length + 1) * Array.SIZE_RATIO);
    }
    memory.set(this.ptr + this.length, value);
    this.length++;
  }
  _resize(size) {
    const oldPtr = this.ptr;
    this.ptr = memory.allocate(size);
    if (this.ptr === null) {
      throw new Error('Out of memory');
    }
    memory.copy(this.ptr, oldPtr, this.length);
    memory.free(oldPtr);
    this._capacity = size;
  }
  get(index) {
    if (index < 0 || index >= this.length) {
      throw new Error('Index error');
    }
    return memory.get(this.ptr + index);
  }
  pop() {
    if (this.length == 0) {
      throw new Error('Index error');
    }
    const value = memory.get(this.ptr + this.length -1);
    this.length--;
    return value;
  }
  insert(index, value) {
    if (index < 0 || index >= this.length) {
      throw new Error('Index error');
    }
    if (this.length >= this._capacity) {
      this._resize((this.length + 1) * Array.SIZE_RATIO);
    }
    memory.copy(this.ptr + index + 1, this.ptr + index, this.length - index);
    memory.set(this.ptr + index, value);
    this.length++;
  }
  remove(index) {
    if (index < 0 || index >= this.length) {
      throw new Error('Index error');
    }
    memory.copy(this.ptr + index, this.ptr + index + 1, this.length - index -1);
    this.length--;
  }
}
Array.SIZE_RATIO = 3;

module.exports = Array;



function main(){

  Array.SIZE_RATIO = 3;

  // Create an instance of the Array class
  let arr = new Array();

  //2.
  // Add an item to the array
  arr.push(3);
  //Array { length: 1, _capacity: 3, ptr: 0 }

  arr.push(5);
  arr.push(15);
  arr.push(19);
  arr.push(45);
  arr.push(10);
  //Array { length: 6, _capacity: 12, ptr: 3 }
  //when array length reaches initial capacity of 3, capacity is increased to 
  //3 + 1 * 3 = 12, and ptr is moved to 3 

  //3.
  //
  arr.pop();
  arr.pop();
  arr.pop();
  //Array { length: 3, _capacity: 12, ptr: 3 }
  //three items were removed from the end of Array, resulting in new length of 3.
  //capacity and ptr stay the same, as Array was not resized or relocated

  //4.
  //
  console.log(arr.get(0));
  arr.pop();
  arr.pop();
  arr.pop();
  arr.push('tauhida');

  console.log(arr.get(0));
  //result: NaN
  //float 64 Array can't handle strings?
  //when capacity is met, _resize moves the array to a new ptr with a greater capacity,
  //specifically length +1 *3
  //It then marks the old ptr as available

  //experiment with booleans, found that booleans are stored and can be retrieved as 0/1
  // arr.pop();
  // arr.push(false);
  // console.log(arr.get(0));
  // arr.pop();

  console.log(arr);
}
main();

//5.

function urlIfy(string) {
  return string.split(' ').join('%20');
}

console.log(urlIfy('tauhida parveen'));


//6.

function filterArray(array) {
  const res = [];
  for (let i = 0; i < array.length; i++) {
    if (array[i] >= 5) {
      res.push(array[i]);
    }
  }
  return res;
}

console.log(filterArray([1,2,3,4,5,6,7,8,9]));


//7.

function maxSum(array) {
  let forward = 0;
  let backward = 0;
  for (let i = 0; i < array.length; i++) {
    let fRes = 0;
    array.slice(i,array.length).map(item => fRes += item);
    if (fRes > forward) {
      forward = fRes;
    }
  }
  for (let i = array.length; i > 0; i--) {
    let bRes = 0;
    array.slice(0,i).map(item => bRes += item);
    if (bRes > backward) {
      backward = bRes;
    }
  }
  return forward > backward ? forward : backward;
}

console.log(maxSum([4,6,-3,5,-2,1]));

//[-1,-2,-3,4,5]
//3, 9



