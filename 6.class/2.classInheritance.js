/**
 *
 * 1. 클래스 확장하기: class Child extends Parent
 * Child.prototype.__proto__가 Parent.prototype이 되므로 메서드 전체가 상속됩니다.
 * 2. 생성자 오버라이딩:
 * this를 사용하기 전에 Child 생성자 안에서 super()로 부모 생성자를 반드시 호출해야 합니다.
 * 3. 메서드 오버라이딩:
 * Child에 정의된 메서드에서 super.method()를 사용해 Parent에 정의된 메서드를 사용할 수 있습니다.
 * 4. super 키워드와 [[HomeObject]]
 * 메서드는 내부 프로퍼티 [[HomeObject]]에 자신이 정의된 클래스와 객체를 기억해놓습니다. super는 [[HomeObject]]를 사용해 부모 메서드를 찾습니다.
 * 따라서 super가 있는 메서드는 객체 간 복사 시 제대로 동작하지 않을 수 있습니다.
 *
 * 추가 사항:
 * 화살표 함수는 this나 super를 갖지 않으므로 주변 컨텍스트에 잘 들어맞습니다.
 */

class MyClass {
  #name;
  #age;
  constructor(name = `harry`, age = 26) {
    this.#name = name;
    this.#age = age;
  }

  get name() {
    return this.#name;
  }
}

class MyClassPrivate {
  #privateField;

  constructor(value) {
    this.#privateField = value;
    console.log(this.#privateField);
  }
}

let myClass = new MyClass();
console.log(myClass.name);

let myClass2 = new MyClassPrivate("private value");

////////////////////////////////////////////////////////////////////////////////

// class Animal {
//   constructor(name) {
//     this.speed = 0;
//     this.name = name;
//   }

//   run(speed) {
//     this.speed = speed;
//     console.log(`${this.name} 은/는 속도 ${this.speed}으로 달립니다.`);
//   }

//   stop() {
//     this.speed = 0;
//     console.log(`${this.name} 이/가 멈췄습니다.`);
//   }
// }

// class Rabbit extends Animal {
//   #hide() {
//     console.log(`${this.name} 이/가 숨었습니다.`);
//   }

//   stop() {
//     super.stop();
//     this.#hide();
//   }
// }

// let rabbit = new Rabbit(`흰 토끼`);
// rabbit.run(10);
// rabbit.stop();

////////////////////////////////////////////////////////////////////////////////

// let animal = {
//     name: "동물",
//     eat() {         // animal.eat.[[HomeObject]] == animal
//       console.log(`${this.name} 이/가 먹이를 먹습니다.`);
//     }
//   };

//   let rabbit = {
//     __proto__: animal,
//     name: "토끼",
//     eat() {         // rabbit.eat.[[HomeObject]] == rabbit
//       super.eat();
//     }
//   };

//   let longEar = {
//     __proto__: rabbit,
//     name: "귀가 긴 토끼",
//     eat() {         // longEar.eat.[[HomeObject]] == longEar
//       super.eat();
//     }
//   };

//   // 이제 제대로 동작합니다
//   longEar.eat();  // 귀가 긴 토끼 이/가 먹이를 먹습니다.

/**
 * 인스턴스 생성 오류
 * 중요도: 5
 * 아래 코드에서 Rabbit은 Animal을 상속받습니다.
 *
 * 그런데 Rabbit 객체를 만들 수가 없습니다. 무엇이 잘못된 것일까요? 코드를 수정해보세요.
 */

class Animal {
  constructor(name) {
    this.name = name;
  }
}

class Rabbit extends Animal {
  constructor(name) {
    super(name);
    this.created = Date.now();
  }
}

let rabbit = new Rabbit("White Rabbit"); // Error: this is not defined
console.log(rabbit.name);

/* 시계 확장하기
중요도: 5
매 초마다 시간을 출력해주는 클래스 Clock이 있습니다. */

class Clock {
  constructor({ template }) {
    this.template = template;
  }

  render() {
    let date = new Date();

    let hours = date.getHours();
    if (hours < 10) hours = "0" + hours;

    let mins = date.getMinutes();
    if (mins < 10) mins = "0" + mins;

    let secs = date.getSeconds();
    if (secs < 10) secs = "0" + secs;

    let output = this.template
      .replace("h", hours)
      .replace("m", mins)
      .replace("s", secs);

    console.log(output);
  }

  stop() {
    clearInterval(this.timer);
  }

  start() {
    this.render();
    this.timer = setInterval(() => this.render(), 1000);
  }
}

/* 
Clock을 상속받는 ExtendedClock을 만들고, precision(정확도)이라는 매개변수도 추가해보세요. precision은 ‘초’ 사이의 간격을 의미하고, 기본값은 1000(1초)이 되어야 합니다.

새로운 파일(extended-clock.js)을 만들어 답을 작성해주세요.
clock.js은 수정하면 안 됩니다. 상속을 사용하세요. */

class ExtendedClock extends Clock {
    constructor(options) {
        super(options);
        let { precision = 1000 } = options;
        this.precision = precision;
    }

    start() {
        super.render();
        this.timer = setInterval(() => this.render(), this.precision);
    }
}

let template = "h : m : s";
let precision = 2000;
let eClock = new ExtendedClock({ template, precision });
eClock.start();