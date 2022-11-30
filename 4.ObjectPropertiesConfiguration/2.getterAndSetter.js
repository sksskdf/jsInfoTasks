/*
객체의 프로퍼티는 두 종류로 나뉩니다.

첫 번째 종류는 데이터 프로퍼티(data property) 입니다. 지금까지 사용한 모든 프로퍼티는 데이터 프로퍼티입니다. 데이터 프로퍼티 조작 방법에 대해선 모두 알고 계실 것이라 생각합니다.

두 번째는 접근자 프로퍼티(accessor property) 라 불리는 새로운 종류의 프로퍼티입니다. 접근자 프로퍼티의 본질은 함수인데, 이 함수는 값을 획득(get)하고 설정(set)하는 역할을 담당합니다. 그런데 외부 코드에서는 함수가 아닌 일반적인 프로퍼티처럼 보입니다.

객체 리터럴 안에서 getter와 setter 메서드는 get과 set으로 나타낼 수 있습니다.

let obj = {
  get propName() {
    // getter, obj.propName을 실행할 때 실행되는 코드
  },

  set propName(value) {
    // setter, obj.propName = value를 실행할 때 실행되는 코드
  }
};

getter 메서드는 obj.propName을 사용해 프로퍼티를 읽으려고 할 때 실행되고, setter 메서드는 obj.propName = value으로 프로퍼티에 값을 할당하려 할 때 실행됩니다.

바깥 코드에선 접근자 프로퍼티를 일반 프로퍼티처럼 사용할 수 있습니다. 접근자 프로퍼티는 이런 아이디어에서 출발했습니다. 접근자 프로퍼티를 사용하면 함수처럼 호출 하지 않고, 일반 프로퍼티에서 값에 접근하는 것처럼 평범하게 user.fullName을 사용해 프로퍼티 값을 얻을 수 있습니다. 나머지 작업은 getter 메서드가 뒷단에서 처리해줍니다.

데이터 프로퍼티의 설명자와 접근자 프로퍼티의 설명자는 다릅니다.

접근자 프로퍼티엔 설명자 value와 writable가 없는 대신에 get과 set이라는 함수가 있습니다.

따라서 접근자 프로퍼티는 다음과 같은 설명자를 갖습니다.

get – 인수가 없는 함수로, 프로퍼티를 읽을 때 동작함
set – 인수가 하나인 함수로, 프로퍼티에 값을 쓸 때 호출됨
enumerable – 데이터 프로퍼티와 동일함
configurable – 데이터 프로퍼티와 동일함

프로퍼티는 접근자 프로퍼티(get/set 메서드를 가짐)나 데이터 프로퍼티(value를 가짐) 중 한 종류에만 속하고 둘 다에 속할 수 없다는 점을 항상 유의하시기 바랍니다.

한 프로퍼티에 get과 value를 동시에 설정하면 에러가 발생합니다.

// Error: Invalid property descriptor.
Object.defineProperty({}, 'prop', {
  get() {
    return 1
  },

  value: 2
});


*/