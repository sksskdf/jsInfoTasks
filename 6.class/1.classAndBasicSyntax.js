/**
 * 요약
아래와 같은 기본 문법을 사용해 클래스를 만들 수 있습니다.

class MyClass {
  prop = value; // 프로퍼티

  constructor(...) { // 생성자 메서드
    // ...
  }

  method(...) {} // 메서드

  get something(...) {} // getter 메서드
  set something(...) {} // setter 메서드

  [Symbol.iterator]() {} // 계산된 이름(computed name)을 사용해 만드는 메서드 (심볼)
  // ...
}

MyClass는 constructor의 코드를 본문으로 갖는 함수입니다. MyClass에서 정의한 일반 메서드나 getter, setter는 MyClass.prototype에 쓰입니다.

이어지는 챕터에선 상속을 비롯한 클래스의 다양한 기능에 대해 알아보겠습니다.
 */

const { log } = console;

class MyClass {
    name;

    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    sayMyName = () => log(`my name is ${this.name}`);

    get name() {
        return this.name;
    }
}

let myClass = new MyClass(`harry`, 26);
log(myClass.name);
myClass.sayMyName();

