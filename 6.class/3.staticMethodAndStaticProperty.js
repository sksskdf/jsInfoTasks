/* 정적 메서드는 특정 클래스 인스턴스가 아닌 클래스 '전체’에 필요한 기능을 만들 때 사용할 수 있습니다.

인스턴스끼리 비교해주는 메서드 Article.compare(article1, article2)이나 팩토리 메서드 Article.createTodays()를 만들 때 정적 메서드가 쓰입니다.

정적 메서드는 클래스 선언부 안에 위치하고 앞에 static이라는 키워드가 붙습니다.

정적 프로퍼티는 데이터를 클래스 수준에 저장하고 싶을 때 사용합니다. 정적 프로퍼티 역시 개별 인스턴스에 묶이지 않습니다. 
*/

class Article {
  constructor(title, date) {
    return { title, date };
  }

  static createTodays() {
    return new this("Today's Digest", new Date());
  }
}

let article1 = Article.createTodays();

console.log(article1);

/* Object를 상속받는 클래스
중요도: 3
아시다시피, 객체는 보통 Object.prototype를 상속받고 hasOwnProperty같은 ‘일반’ 객체 메서드에 접근할 수 있습니다. */

class Rabbit {
    constructor(name) {
      this.name = name;
    }
  }
  
  let rabbit = new Rabbit("Rab");
  
  // 메서드 hasOwnProperty는 Object.prototype에서 왔습니다.
  alert( rabbit.hasOwnProperty('name') ); // true

  /* 그런데 "class Rabbit extends Object"같이 상속을 명시적으로 해주는 경우와 그냥 "class Rabbit"를 사용하는 경우, 결과가 다를까요?

만약 다르다면 어떤 것이 다를까요?

아래 예시에서 "class Rabbit extends Object"를 사용한 코드가 있는데, 실행해보면 동작하지 않습니다. 어디서 문제가 생긴걸까요? 코드를 수정해보세요. */

class Rabbit extends Object {
    constructor(name) {
      this.name = name;
    }
  }
  
  let rabbit = new Rabbit("Rab");
  
  alert( rabbit.hasOwnProperty('name') ); // Error
