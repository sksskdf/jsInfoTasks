/* 
프로토타입에 직접 접근할 땐 다음과 같은 모던한 메서드를 사용할 수 있습니다.

Object.create(proto, [descriptors]) – [[Prototype]]이 proto인 객체를 만듭니다. 참조 값은 null일 수 있고 프로퍼티 설명자를 넘기는 것도 가능합니다.
Object.getPrototypeOf(obj) – obj의 [[Prototype]]을 반환합니다(__proto__ getter와 같습니다).
Object.setPrototypeOf(obj, proto) – obj의 [[Prototype]]을 proto로 설정합니다(__proto__ setter와 같습니다).
사용자가 키를 직접 만들 수 있게 허용하면, 내장 __proto__의 getter, setter 때문에 의도하지 않은 결과가 나올 수 있습니다. 키가 "__proto__"일 때 에러가 발생할 수 있죠. 단순한 에러면 좋겠지만 보통 예측 불가능한 결과가 생깁니다.

이를 방지하려면 Object.create(null)을 사용해 __proto__가 없는 '아주 단순한 객체’를 만들거나, 맵을 사용하는게 좋습니다.

한편, Object.create를 사용하면 객체의 얕은 복사본(shallow-copy)을 만들 수 있습니다. 

let clone = Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj));

지금까지 우리는 __proto__는 [[Prototype]]의 getter, setter라는 점과 __proto__는 다른 메서드처럼 Object.prototype에 정의되어 있다는 것을 확인해 보았습니다.

Object.create(null)을 사용하면 프로토타입이 없는 객체를 만들 수 있습니다. 이런 객체는 "__proto__"를 키로 사용해도 문제를 일으키지 않기 때문에 커스텀 사전을 만들 때 유용합니다.

지금까지 살펴본 내용과 더불어 아래 메서드도 같이 살펴보면 좋습니다.

Object.keys(obj) / Object.values(obj) / Object.entries(obj) – obj 내 열거 가능한 프로퍼티 키, 값, 키-값 쌍을 담은 배열을 반환합니다.
Object.getOwnPropertySymbols(obj) – obj 내 심볼형 키를 담은 배열을 반환합니다.
Object.getOwnPropertyNames(obj) – obj 내 문자형 키를 담은 배열을 반환합니다.
Reflect.ownKeys(obj) – obj내 키 전체를 담은 배열을 반환합니다.
obj.hasOwnProperty(key) – 상속받지 않고 obj 자체에 구현된 키 중 이름이 key인 것이 있으면 true를 반환합니다.
Object.keys를 비롯하여 객체의 프로퍼티를 반환하는 메서드들은 객체가 ‘직접 소유한’ 프로퍼티만 반환합니다. 상속 프로퍼티는 for..in을 사용해 얻을 수 있습니다.
*/

/*
사전에 toString 추가하기
중요도: 5
key/value 쌍을 저장하기 위해 Object.create(null)로 생성된 dictionary 객체가 있습니다.

그 안에 쉼표로 구분된 키 목록을 반환하는 dictionary.toString()메서드를 추가하십시오. toString은 객체 위의 for..in에 나타나서는 안 됩니다.

작동 방식은 다음과 같습니다.
*/

let dictionary = Object.create(null, {
    toString: {
        value() {
            return Object.keys(this).join();
        }
    }
});

// 데이터를 추가합니다.
dictionary.apple = "Apple";
dictionary.__proto__ = "test"; // __proto__는 여기서 일반적인 프로퍼티 키입니다.

// 반복문에는 apple과 __proto__ 만 있습니다.
for(let key in dictionary) {
  console.log(key); // "apple" 다음 "__proto__"입니다.
}

// toString이 동작하는 부분입니다.
console.log(dictionary); // "apple,__proto__"