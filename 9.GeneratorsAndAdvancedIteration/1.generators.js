/*
요약
제너레이터는 제너레이터 함수 function* f(…) {…}을 사용해 만듭니다.
yield 연산자는 제너레이터 안에 있어야 합니다.
next/yield 호출을 사용하면 외부 코드와 제너레이터 간에 결과를 교환할 수 있습니다.
모던 자바스크립트에서는 제너레이터를 잘 사용하지 않습니다. 그러나 제너레이터를 사용하면 실행 중에도 제너레이터 호출 코드와 데이터를 교환할 수 있기 때문에 유용한 경우가 종종 있습니다. 그리고 제너레이터를 사용하면 이터러블 객체를 쉽게 만들 수 있다는 장점도 있습니다.

다음 챕터에선 for await ... of 루프 안 비동기 데이터 스트림을 다룰 때 사용되는 비동기 제너레이터(asnyc generator)에 대해 알아볼 예정입니다. 비동기 제너레이터는 페이지네이션을 사용해 전송되는 비동기 데이터 스트림을 다룰 때 사용됩니다.

웹 프로그래밍에선 데이터 스트림을 다뤄야 하는 경우가 많은데, 제너레이터는 이 경우에 유용합니다.
*/
{
  function* generateSequence(start, end) {
    for (let i = start; i <= end; i++) yield i;
  }

  let arr = [...generateSequence(1, 5)];
  console.log(arr);

  function* generatePasswordCodes() {
    yield* generateSequence(48, 57);

    yield* generateSequence(65, 90);

    yield* generateSequence(97, 122);
  }

  let str = ``;

  for (let code of generatePasswordCodes()) {
    str += String.fromCharCode(code);
  }

  console.log(str);
}

/*
의사 난수 생성기
개발을 하다 보면 임의의 데이터가 필요한 경우가 자주 생깁니다.

테스팅을 진행할 때도 임의의 데이터가 필요할 수 있습니다. 정형화된 데이터가 아닌 랜덤한 텍스트나 숫자 등을 입력해 테스트를 진행하는 것이 좋기 때문입니다.

자바스크립트에서는 Math.random()을 사용해 난수를 만들 수 있습니다. 그런데 테스트 도중 문제가 생겨 테스트를 중단했다가 소스 코드를 고치고 다시 테스트를 재개할 때는 이전에 문제를 일으켰던 데이터와 동일한 데이터를 입력해 같은 문제가 발생하는지 살펴보아야 합니다.

이를 위해 '고정값 의사 난수 생성기’가 사용됩니다. 고정값 의사 난수 생성기는 첫 번째 값을 '고정값’으로 삼고, 생성기 안에 저장된 공식을 사용해 두 번째 값을 생성합니다. 고정값이 같으면 난수 생성기에서 차례대로 나오는 값들이 동일하므로 난수 생성 흐름을 쉽게 재현할 수 있습니다. 고정값만 기억해 두면 됩니다.

다소 균일하게 분포된 값을 생성하는 공식의 예는 다음과 같습니다.

next = previous * 16807 % 2147483647
고정값으로 1을 사용하면 생성기에서 나오는 값은 다음과 같습니다.

16807
282475249
1622650073
…기타 등등…
이번 과제는 고정값을 받아 위 공식을 사용해 제너레이터를 만들어내는 함수인 pseudoRandom(seed)을 만드는 것입니다.
*/
{
  function* pseudoRandom(seed) {
    let value = seed;

    while (true) {
      value = (value * 16_807) % 2_147_483_647;
      yield value;
    }
  }

  let generator = pseudoRandom(1);

  console.log(generator.next().value); // 16807
  console.log(generator.next().value); // 282475249
  console.log(generator.next().value); // 1622650073
}
