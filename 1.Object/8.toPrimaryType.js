/*
원시값을 기대하는 내장 함수나 연산자를 사용할 때 객체-원시형으로의 형 변환이 자동으로 일어납니다.

객체-원시형으로의 형 변환은 hint를 기준으로 세 종류로 구분할 수 있습니다.

"string" (alert 같이 문자열을 필요로 하는 연산)
"number" (수학 연산)
"default" (드물게 발생함)
연산자별로 어떤 hint가 적용되는지는 명세서에서 찾아볼 수 있습니다. 연산자가 기대하는 피연산자를 '확신할 수 없을 때’에는 hint가 "default"가 됩니다. 
이런 경우는 아주 드물게 발생합니다. 내장 객체는 대개 hint가 "default"일 때와 "number"일 때를 동일하게 처리합니다. 
따라서 실무에선 hint가 "default"인 경우와 "number"인 경우를 합쳐서 처리하는 경우가 많습니다.

객체-원시형 변환엔 다음 알고리즘이 적용됩니다.

객체에 obj[Symbol.toPrimitive](hint)메서드가 있는지 찾고, 있다면 호출합니다.
1에 해당하지 않고 hint가 "string"이라면,
obj.toString()이나 obj.valueOf()를 호출합니다.
1과 2에 해당하지 않고, hint가 "number"나 "default"라면
obj.valueOf()나 obj.toString()을 호출합니다.
obj.toString()만 사용해도 '모든 변환’을 다 다룰 수 있기 때문에, 실무에선 obj.toString()만 구현해도 충분한 경우가 많습니다. 
반환 값도 ‘사람이 읽고 이해할 수 있는’ 형식이기 때문에 실용성 측면에서 다른 메서드에 뒤처지지 않습니다. 
obj.toString()은 로깅이나 디버깅 목적으로도 자주 사용됩니다.
*/

/**
 * obj1 + obj2 처럼 객체끼리 더하거나 빼는 연산을 하면 어떻게 될까?
 * 이 모든경우에는 자동형변환이 일어난다.
 * 객체는 원시값으로 바뀌고 그 후 의도한 연산이 수행된다.
 */

/**
 * - To Primtive
 * 객체의 형 변환 시 hint라 불리는 값이 구분 기준이 되는데, alert 함수와 같이 문자열을 기대하는 연산을 수행할 때는 hint가 string이 된다.
 * 연산자가 기대하는 자료형이 확실치 않을 때 hint는 default가 된다.
 */

/**
 * 자바스크립트는 형 변환이 필요할 때 아래와 같은 알고리즘에 따라 원하는 메서드를 찾고 호출한다.
 * 
 * 1. 객체에 obj[Symbol.toPrimitive](hint) 메서드가 있는지 찾고, 있다면 메서드를 호출한다.
 * Symbol.toPrimitive 는 시스템 심볼로, 심볼형 키로 사용된다.
 * 
 * 2. 1에 해당하지 않고 hint가 string이면, obj.toString()이나 obj.valueOf()를 호출한다.
 * 
 * 3. 1과 2에 해당하지 않고, hint가 number 혹은 default라면 obj.valueOf()나 obj.toString()을 호출한다.
 */

/**
 * Symbol.toPrimitive
 * 자바스크립트엔 Symbol.toPrimitive라는 내장 심볼이 존재하는데, 이 심볼은 아래와 같이 목표로 하는 자료형을 명명하는데 사용된다.
 */

// obj[Symbol.toPrimitive] = function(hint) {
//     //원시값을 반환해야 한다.
//     //hint는 string, number, default중에 하나가 된다.
// }

let user = {
    name: "John",
    money: 1000,

    [Symbol.toPrimitive](hint) {
        console.log(`hint: ${hint}`);
        return hint == "string" ? `{name: "${this.name}"}` : this.money;
    }
};

// 데모:
console.log(user); // hint: string -> {name: "John"}
console.log(+user); // hint: number -> 1000
console.log(user + 500); // hint: default -> 1500


const obj = {
    [Symbol.toPrimitive](hint) {
        return hint == "string" ? 'obj' : 1;
    }
}

console.log(obj + obj);

/**
 * - toString과 valueOf
 * 객체에 Symbol.toPrimitive 가 없으면 자바스크립트는 아래 규칙에 따라 toString이나 valueOf를 호출한다.
 * 
 * 1. hint가 string일 경우 toString -> valueOf 순
 * 2. 그 외 : valueOf -> toString 순
 */

let user2 = {
    name: "John",
    money: 1000,

    // hint가 "string"인 경우
    toString() {
        return `{name: "${this.name}"}`;
    },

    // hint가 "number"나 "default"인 경우
    valueOf() {
        return this.money;
    }
};

console.log(user2); // toString -> {name: "John"}
console.log(+user2); // valueOf -> 1000
console.log(user2 + 500); // valueOf -> 1500

/**
 * 객체에 Symbol.toPrimitive와 valueOf가 없으면, toString이 모든 형 변환을 처리한다.
 * obj.toString()만 사용해도 '모든 변환’을 다 다룰 수 있기 때문에, 실무에선 obj.toString()만 구현해도 충분한 경우가 많다.
 * 반환 값도 ‘사람이 읽고 이해할 수 있는’ 형식이기 때문에 실용성 측면에서 다른 메서드에 뒤처지지 않는다. 
 * obj.toString()은 로깅이나 디버깅 목적으로도 자주 사용된다.
 */
