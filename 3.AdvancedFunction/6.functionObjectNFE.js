/*
함수는 객체입니다.

이번 챕터에선 객체로서의 함수에서 사용 할 수 있는 프로퍼티 두 가지를 다뤄보았습니다.

name – 함수의 이름이 저장됩니다. 대개는 함수 선언부에서 이름을 가져오는데, 선언부에 이름이 없는 경우엔 자바스크립트 엔진이 컨텍스트(할당 등)를 이용해 이름을 추론합니다.
length – 함수 선언부에 있는 인수의 수로 나머지 매개변수는 포함되지 않습니다.
함수 표현식으로 함수를 정의하였는데 이름이 있다면 이를 기명 함수 표현식이라 부릅니다. 기명 함수 표현식의 이름은 재귀 호출과 같이 함수 내부에서 자기 자신을 호출하고자 할 때 사용할 수 있습니다.

함수엔 다양한 프로퍼티를 추가할 수 있습니다. 널리 쓰이는 자바스크립트 라이브러리 상당수에서 이런 커스텀 프로퍼티를 잘 활용하고 있습니다.

이런 라이브러리들은 ‘주요’ 함수 하나를 만들고 여기에 다양한 ‘헬퍼’ 함수를 붙이는 식으로 구성됩니다. jQuery는 이름이 $인 주요 함수로 이루어져 있습니다. lodash는 주요 함수 _에 _.clone, _.keyBy등의 프로퍼티를 추가하는 식으로 구성되죠. 자세한 정보는 lodash 공식 문서에서 찾아볼 수 있습니다. 이렇게 함수 하나에 다양한 헬퍼 함수를 붙여 라이브러리를 만들면 라이브러리 하나가 전역 변수 하나만 사용하므로 전역 공간을 더럽히지 않는다는 장점이 있습니다. 이름 충돌도 방지할 수 있죠.

이렇게 객체로서의 함수 특징을 이용해 커스텀 프로퍼티를 만들면 함수는 자기 자신을 이용해 원하는 일을 수행할 수 있고, 함수 자기 자신에 딸린 프로퍼티의 기능도 사용할 수 있다는 장점이 있습니다.
*/

/*
숫자 설정과 감소가 가능한 counter 만들기
중요도: 5
다음 makeCounter()코드를 수정해서 카운터가 감소하고 숫자를 설정하게 해보세요.

counter()는 다음 숫자를 반환해야 합니다.
counter.set(value)는 counter를 value로 설정해야 합니다.
counter.decrease()는 counter를 1 감소시켜야 합니다.
아래 링크를 클릭해 sandbox에 작성된 코드를 보고, 사용법을 살펴보세요.

참고: 클로저 또는 함수 프로퍼티를 사용해 counter 값을 저장할 수 있습니다. 두 가지 방법을 모두 사용해 답안을 두 개 만드셔도 됩니다.
*/

{
  function makeCounter() {
    let count = 0;

    function counter() {
      return count++;
    }

    counter.set = (value) => (count = value); //이렇게 해야 동일한 외부렉시컬환경을 공유한다.
    counter.decrease = () => count--;

    return counter;
  }

  let counter = makeCounter();

  console.log(counter()); // 0
  console.log(counter()); // 1

  counter.set(10); // set the new count

  console.log(counter()); // 10

  counter.decrease(); // decrease the count by 1

  console.log(counter()); // 10 (instead of 11)
}
