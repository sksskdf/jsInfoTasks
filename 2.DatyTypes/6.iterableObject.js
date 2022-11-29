const { log } = console;

/**
 * for..of을 사용할 수 있는 객체를 이터러블이라고 부릅니다.

이터러블엔 메서드 Symbol.iterator가 반드시 구현되어 있어야 합니다.
obj[Symbol.iterator]의 결과는 이터레이터라고 부릅니다. 이터레이터는 이어지는 반복 과정을 처리합니다.
이터레이터엔 객체 {done: Boolean, value: any}을 반환하는 메서드 next()가 반드시 구현되어 있어야 합니다. 여기서 done:true은 반복이 끝났음을 의미하고 그렇지 않은 경우엔 value가 다음 값이 됩니다.
메서드 Symbol.iterator는 for..of에 의해 자동으로 호출되는데, 개발자가 명시적으로 호출하는 것도 가능합니다.
문자열이나 배열 같은 내장 이터러블에도 Symbol.iterator가 구현되어 있습니다.
문자열 이터레이터는 서로게이트 쌍을 지원합니다.
인덱스와 length 프로퍼티가 있는 객체는 유사 배열이라 불립니다. 유사 배열 객체엔 다양한 프로퍼티와 메서드가 있을 수 있는데 배열 내장 메서드는 없습니다.

명세서를 보면 대부분의 메서드는 ‘진짜’ 배열이 아닌 이터러블이나 유사 배열을 대상으로 동작한다고 쓰여 있는걸 볼 수 있습니다. 이 방법이 더 추상적이기 때문입니다.

Array.from(obj[, mapFn, thisArg])을 사용하면 이터러블이나 유사 배열인 obj를 진짜 Array로 만들 수 있습니다. 이렇게 하면 obj에도 배열 메서드를 사용할 수 있죠. 선택 인수 mapFn와 thisArg는 각 요소에 함수를 적용할 수 있게 해줍니다.

 */

let iter = {
  from: 1,
  to: 5,
  [Symbol.iterator]() {
    return {
      current: this.from,
      last: this.to,
      next() {
        if (this.current <= this.last) {
          return { done: false, value: this.current++ };
        } else {
          return { done: true };
        }
      },
    };
  },
};

let iter1 = iter;
iter1.from = 1;
iter1.to = 5;

for (let i of iter1) {
  log(i);
}
