/*
객체는 참조에 의해 할당되고 복사됩니다. 변수엔 ‘객체’ 자체가 아닌 메모리상의 주소인 '참조’가 저장됩니다. 
따라서 객체가 할당된 변수를 복사하거나 함수의 인자로 넘길 땐 객체가 아닌 객체의 참조가 복사됩니다.

그리고 복사된 참조를 이용한 모든 작업(프로퍼티 추가·삭제 등)은 동일한 객체를 대상으로 이뤄집니다.

객체의 '진짜 복사본’을 만들려면 '얕은 복사(shallow copy)'를 가능하게 해주는 Object.assign이나 '깊은 복사’를 가능하게 해주는 _.cloneDeep(obj)를 사용하면 됩니다. 
이때 얕은 복사본은 중첩 객체를 처리하지 못한다는 점을 기억해 두시기 바랍니다.
*/

"use strict";

const user = {
  name: "Harry",
};

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

clone.name = "Pete";
console.log(clone); // name: 'Pete'

/**
 * Object.assign() 을 이용하여 복제할 수도 있다.
 */

let clone2 = {};

Object.assign(clone2, user);
console.log(clone2); // name: 'Harry';
console.log(user == clone2); // false
