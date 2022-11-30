/*
객체 프로퍼티는 값과 함께 플래그라 불리는 특별한 속성 세가지를 갖습니다.
writable – true이면 값을 수정할 수 있습니다. 그렇지 않다면 읽기만 가능합니다.
enumerable – true이면 반복문을 사용해 나열할 수 있습니다. 그렇지 않다면 반복문을 사용해 나열할 수 없습니다.
configurable – true이면 프로퍼티 삭제나 플래그 수정이 가능합니다. 그렇지 않다면 프로퍼티 삭제와 플래그 수정이 불가능합니다.

'평범한 방식’으로 프로퍼티를 만들면 해당 프로퍼티의 플래그는 모두 true가 됩니다. 이렇게 true로 설정된 플래그는 언제든 수정할 수 있습니다.

Object.getOwnPropertyDescriptor메서드를 사용하면 특정 프로퍼티에 대한 정보를 모두 얻을 수 있습니다.
let descriptor = Object.getOwnPropertyDescriptor(obj, propertyName);

메서드 Object.defineProperty를 사용하면 플래그를 변경할 수 있습니다.
Object.defineProperty(obj, propertyName, descriptor)

Object.defineProperties(obj, descriptors) 메서드를 사용하면 프로퍼티 여러 개를 한 번에 정의할 수 있습니다.
Object.defineProperties(user, {
  name: { value: "John", writable: false },
  surname: { value: "Smith", writable: false },
  // ...
});
*/