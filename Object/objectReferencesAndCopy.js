'use strict';

const user = {
    name : 'Harry'
}

/**
 * 객체의 참조 값이 복사됨.
 * 선언한 변수는 두개지만 같은 값이다.
 */
let user1 = user;

/**
 * 객체를 복제하고 싶다면 객체 프로퍼티들을 순회해 원시 수준까지 프로퍼티를 복사하면 된다.
 */
let clone = {}; 

for (let key in user) {
    clone[key] = user[key];
}

clone.name = 'Pete';
console.log(clone); // name: 'Pete'

/**
 * Object.assign() 을 이용하여 복제할 수도 있다.
 */

let clone2 = {};

Object.assign(clone2, user);
console.log(clone2); // name: 'Harry';
console.log(user == clone2); // false