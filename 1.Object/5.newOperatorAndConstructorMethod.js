/*
생성자 함수(짧게 줄여서 생성자)는 일반 함수입니다. 다만, 일반 함수와 구분하기 위해 함수 이름 첫 글자를 대문자로 씁니다.
생성자 함수는 반드시 new 연산자와 함께 호출해야 합니다. new와 함께 호출하면 내부에서 this가 암시적으로 만들어지고, 마지막엔 this가 반환됩니다.
생성자 함수는 유사한 객체를 여러 개 만들 때 유용합니다.

자바스크립트는 언어 차원에서 다양한 생성자 함수를 제공합니다. 날짜를 나타내는 데 쓰이는 Date, 집합(set)을 나타내는 데 쓰이는 Set 등의 내장 객체는 이런 생성자 함수를 이용해 만들 수 있습니다. 
자세한 내용은 다시 살펴보도록 하겠습니다.
*/

/**
 * -생성자 함수
 * 생성자 함수는 일반 함수와의 기술적인 차이는 없지만 두 관례를 따른다.
 * 1. 함수 이름은 반드시 대문자로
 * 2. 반드시 new 연산자를 붙여 실행
 */

function User(name) {
    this.name = name;
    this.isAdmin = false;
}

let user = new User('Harry');
console.log(user); // User { name: 'Harry', isAdmin: false }

/**
 * new User(...)를 써서 함수를 실행하면 
 * 1. 빈 객체를 만들어 this에 할당
 * 2. 함수 본문을 실행, this에 새로운 프로퍼티 추가, this 수정
 * 3. this 반환
 * 한다.
 */

 function User(name) {
    // this = {};  (빈 객체가 암시적으로 만들어짐)
  
    // 새로운 프로퍼티를 this에 추가함
    this.name = name;
    this.isAdmin = false;
  
    // return this;  (this가 암시적으로 반환됨)
}

/**
 * 어떤 함수라도 new를 붙여 실행하면 위와 같은 동작을 한다.
 * 생성자를 통해 재사용 가능한 객체 생성 코드를 구현할 수 있다.
 * 번외로 new.target 프로퍼티를 통해 new와 함께 호출되었는지 알 수 있다.
 */

/**
 * -생성자와 return문
 * 생성자함수엔 return문이 없다 왜냐하면 필요한 정보는 this에 저장되고 this는 자동으로 반환되기 때문이다.
 * 그런데 return문이 있다면 this대신 객체가 반환되고, 원시형은 return하면 return은 무시된다.
 */

 function BigUser() {
    this.name = "원숭이";
    return { name: "고릴라" };  // <-- this가 아닌 새로운 객체를 반환함
}
  
console.log( new BigUser().name );  // 고릴라

function SmallUser() {
    this.name = "원숭이";
    return; // <-- this를 반환함
}
  
console.log( new SmallUser().name );  // 원숭이

/**
 * -생성자 내 메서드
 * 생성자 함수를 사용하면 매개변수를 이용해 객체 내부를 자유롭게 구성할 수 있다.
 * this에 프로퍼티를 더하는것 뿐만 아니라 메서드를 더해주는것도 가능하다.
 */

 function User(name) {
    this.name = name;
  
    this.sayHi = function() {
      console.log( "제 이름은 " + this.name + "입니다." );
    };
  }
  
  let bora = new User("이보라");
  
  bora.sayHi(); // 제 이름은 이보라입니다.

  /**
   * class문법을 사용하면 생성자 함수를 사용하는것과 같이 복잡한 객체를 만들 수 있다.
   */

  /**
   * 1. 계산기 만들기
   * 아래와 같은 세 개의 메서드를 가진 생성자 함수, Calculator를 만들어보세요.
        read() – prompt 함수를 이용해 사용자로부터 값 두 개를 받고, 이를 객체 프로퍼티에 저장합니다.
        sum() – 프로퍼티에 저장된 값 두 개를 더한 후 반환합니다.
        mul() – 프로퍼티에 저장된 값 두 개를 곱한 후 반환합니다.
   */

function Calculator() {
    this.read = function() {
        this.a = +prompt();
        this.b = +prompt();
    },
    this.sum = function() {
        return this.a + this.b;
    },
    this.mul = function() {
        return this.a * this.b;
    }
}

let calculator = new Calculator();
calculator.read();

console.log( "Sum=" + calculator.sum() );
console.log( "Mul=" + calculator.mul() );