/**
 * 심볼형
 * JS는 객체 프로퍼티 키로 문자형과 심볼형만을 허용한다.
 * 심볼은 유일한 식별자를 만들고 싶을 때 사용한다.
 */

let id = Symbol();
let id2 = Symbol("id2");

/**
 * 심볼은 유일성이 보장되는 자료형이다.
 * 그래서 인자로 주어진 설명이 동일한 심볼을 여러개 만들어도 각 심볼값은 다르다.
 * 
 * 심볼을 이용하면 숨김프로퍼티를 만들 수 있다.
 * 숨김 프로퍼티는 외부에서 접근이 불가능하고 값도 덮어쓸 수 없는 프로퍼티이다.
 */

let user = { // 서드파티 코드에서 가져온 객체
    name: "John"
};

let id3 = Symbol("id");

user[id3] = 1;

console.log(user[id3]); // 심볼을 키로 사용해 데이터에 접근할 수 있습니다.
console.log(user.id3); // undefined

/**
 * 문자열 id를 키로 사용해도 되는데 왜 심볼을 사용했을까?
 * 심볼은 유일성을 보장하기 때문에 외부코드에서 프로퍼티가 덮어쓰여지는것을 막을 수 있다.
 */

let id4 = Symbol("id");

let user2 = {
    name: "John",
    [id4]: 123 // "id": 123은 안됨
};

/**
 * 심볼은 추가적으로 for..in loop에서 제외된다.
 * 하지만 Object.assign은 키가 심볼인 프로퍼티를 배제하지 않고 객체 내 모든 프로퍼티를 복사한다.
 */

let id5 = Symbol("id");
let user3 = {
    [id5]: 123
};

let clone = Object.assign({}, user3);

console.log(clone[id5]); // 123

/**
 * 전역 심볼 레지스트리는 심볼식별자를 통해 접근할 수 있게 해준다.
 */

// 전역 레지스트리에서 심볼을 읽습니다.
let id6 = Symbol.for("id"); // 심볼이 존재하지 않으면 새로운 심볼을 만듭니다.

// 동일한 이름을 이용해 심볼을 다시 읽습니다(좀 더 멀리 떨어진 코드에서도 가능합니다).
let idAgain = Symbol.for("id");

// 두 심볼은 같습니다.
console.log(id === idAgain); // true


let harry = {
    [id6]: 123
};

console.log(harry[idAgain]); //123

// 이름을 이용해 심볼을 찾음
let sym = Symbol.for("name");
let sym2 = Symbol.for("id");

// 심볼을 이용해 이름을 얻음
console.log( Symbol.keyFor(sym) ); // name
console.log( Symbol.keyFor(sym2) ); // id

/**
 * 시스템 심볼은 자바스크립트 내부에서 사용되는 심볼이다.
 * 시스템 심볼을 이용하면 객체를 미세하게 조정할 수 있다.
 * 예를 들어 객체가 원시형으로 어떻게 변환되는지 알려면 Symbol.toPrimitive에 대해 알아야 한다.
 */