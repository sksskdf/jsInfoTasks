/* 
이번 챕터에선 생성자 함수를 이용해 만든 객체의 [[Prototype]]이 어떻게 설정되는지 간략히 알아보았습니다. 이 방법을 기반으로 하는 고급 프로그래밍 패턴에 대해선 추후 학습할 예정입니다.

몇 가지 사항만 명확하게 이해하고 있으면 지금까지 배운 것들은 복잡하지 않습니다.

생성자 함수에 기본으로 세팅되는 프로퍼티(F.prototype)는 [[Prototype]]과 다릅니다. F.prototype은 new F()를 호출할 때 만들어지는 새로운 객체의 [[Prototype]]을 설정합니다.
F.prototype의 값은 객체나 null만 가능합니다. 다른 값은 무시됩니다.
지금까지 배운 내용은 생성자 함수를 new를 사용해 호출할 때만 적용됩니다.
참고로 일반 객체엔 "prototype" 프로퍼티를 추가해도 아무런 일이 일어나지 않습니다.

let user = {
  name: "John",
  prototype: "Bla-bla" // 마술은 일어나지 않습니다.
};
모든 함수는 기본적으로 F.prototype = { constructor : F }를 가지고 있으므로 "constructor" 프로퍼티를 사용하면 객체의 생성자를 얻을 수 있습니다. */

/* 
'prototype' 변경하기
중요도: 5
아래 코드에선 new Rabbit를 만들고 Rabbit의 "prototype"을 변경합니다.

시작 코드는 다음과 같습니다. */

function Rabbit() {}
Rabbit.prototype = {
  eats: true
};

let rabbit = new Rabbit();

alert( rabbit.eats ); // true

// 1. 아래와 같은 코드를 추가(강조된 줄)하면 얼럿창엔 무엇이 출력될까요?

function Rabbit() {}
Rabbit.prototype = {
  eats: true
};

let rabbit = new Rabbit();

Rabbit.prototype = {};

alert( rabbit.eats ); // true

// 2. 아래와 같이 코드를 변경하면 얼럿창엔 무엇이 출력될까요?

function Rabbit() {}
Rabbit.prototype = {
  eats: true
};

let rabbit = new Rabbit();

Rabbit.prototype.eats = false;

alert( rabbit.eats ); // false

// 3. 아래와 같이 delete를 사용하면 얼럿창엔 무엇이 출력될까요?

function Rabbit() {}
Rabbit.prototype = {
  eats: true
};

let rabbit = new Rabbit();

delete rabbit.eats;

alert( rabbit.eats ); // true

// 4. 마지막 코드를 실행하면 얼럿창엔 무엇이 출력될까요?

function Rabbit() {}
Rabbit.prototype = {
  eats: true
};

let rabbit = new Rabbit();

delete Rabbit.prototype.eats;

alert( rabbit.eats ); // undefined