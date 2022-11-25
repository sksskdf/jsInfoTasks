/* 자바스크립트의 모든 객체엔 숨김 프로퍼티 [[Prototype]]이 있는데, 이 프로퍼티는 객체나 null을 가리킵니다.
obj.__proto__를 사용하면 프로토타입에 접근할 수 있습니다. __proto__는 [[Prototype]]의 getter·setter로 쓰이는데, 요즘엔 잘 쓰지 않습니다. 자세한 사항은 뒤쪽 챕터에서 다룰 예정입니다.
[[Prototype]]이 참조하는 객체를 '프로토타입’이라고 합니다.
객체에서 프로퍼티를 읽거나 메서드를 호출하려는데 해당하는 프로퍼티나 메서드가 없으면 자바스크립트는 프로토타입에서 프로퍼티나 메서드를 찾습니다.
접근자 프로퍼티가 아닌 데이터 프로퍼티를 다루고 있다면, 쓰기나 지우기와 관련 연산은 프로토타입을 통하지 않고 객체에 직접 적용됩니다.
프로토타입에서 상속받은 method라도 obj.method()를 호출하면 method 안의 this는 호출 대상 객체인 obj를 가리킵니다.
for..in 반복문은 객체 자체에서 정의한 프로퍼티뿐만 아니라 상속 프로퍼티도 순회 대상에 포함합니다. 반면, 키-값과 관련된 내장 메서드 대부분은 상속 프로퍼티는 제외하고 객체 자체 프로퍼티만을 대상으로 동작합니다. */

// let animal = {
//   eats: true,
// };

// let rabbit = {
//   jumps: true,
// };

// //__proto__ 는 [[Prototype]]용 getter, setter 이다.
// //rabbit.__proto__ = animal;
// Object.setPrototypeOf(rabbit, animal);

// console.log(rabbit.eats);

// for (let r in rabbit) {
//     if (rabbit.hasOwnProperty(r)) {
//         console.log(r);
//     }
// }

/* 프로토타입 이해하기
중요도: 5
객체 두 개를 이용해 쌍을 만들고 이를 수정하는 코드가 아래에 있습니다.

얼럿창에 어떤 값이 나올지 예측해보세요. */

let animal = {
  jumps: null,
};
let rabbit = {
  __proto__: animal,
  jumps: true,
};

alert(rabbit.jumps); // ? (1)

delete rabbit.jumps;

alert(rabbit.jumps); // ? (2)

delete animal.jumps;

alert(rabbit.jumps); // ? (3)

/*   검색 알고리즘
중요도: 5
이번에 풀 과제는 두 부분으로 구성됩니다.

먼저, 아래 객체를 살펴봅시다. */
let head = {
  glasses: 1,
};

let table = {
  __proto__: head,
  pen: 3,
};

let bed = {
  __proto__: table,
  sheet: 1,
  pillow: 2,
};

let pockets = {
  __proto__: bed,
  money: 2000,
};

console.log(pockets.glasses);
console.log(head.glasses);
