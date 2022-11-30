/*
데코레이터는 함수를 감싸는 래퍼로 함수의 행동을 변화시킵니다. 주요 작업은 여전히 함수에서 처리합니다.

데코레이터는 함수에 추가된 ‘기능’ 혹은 ‘상(相, aspect)’ 정도로 보시면 됩니다. 하나 혹은 여러 개의 데코레이터를 추가해도 함수의 코드는 변경되지 않습니다.

cachingDecorator는 아래와 같은 메서드를 사용해 구현하였습니다.

func.call(context, arg1, arg2…) – 주어진 컨텍스트와 인수를 사용해 func를 호출합니다.
func.apply(context, args) – this에 context가 할당되고, 유사 배열 args가 인수로 전달되어 func이 호출됩니다.
콜 포워딩은 대개 apply를 사용해 구현합니다.

let wrapper = function() {
  return original.apply(this, arguments);
};
특정 객체에서 메서드를 가져오고, 다른 객체를 컨텍스트로 고정한 후 함수를 호출(call)하는 형태인 메서드 빌리기에 대한 예제도 살펴보았습니다. 메서드 빌리기는 배열 메서드를 빌려서 이를 arguments에 적용할 때 흔히 사용됩니다. 나머지 매개변수와 배열을 함께 사용하면 유사한 기능을 구현할 수 있습니다.

데코레이터를 사용해서 기능을 구현한 사례들이 많습니다. 아래 문제들을 풀어보면서 데코레이터에 대해 얼마나 이해하고 있는지 확인해봅시다.
*/

{
  function slow(x) {
    return x;
  }

  function decorator(func) {
    return function (x) {
      return x * 2;
    };
  }

  slow = decorator(slow);

  console.log(slow(2));
}

