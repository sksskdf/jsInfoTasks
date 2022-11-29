/*
요약
커스텀 클래스는 Error나 다른 내장 에러 클래스를 상속받아 만들 수 있습니다. 이때 super를 호출해야 한다는 점과 name 프로퍼티를 신경 써야 한다는 점을 잊지 마세요.
instanceof를 사용하면 에러 종류를 판별할 수 있습니다. 상속된 클래스에도 마찬가지죠. 그런데 서드파티 라이브러리에서 온 에러 객체는 클래스를 알아내는 것이 쉽지 않습니다. 
이럴 땐 name 프로퍼티를 사용해 오류 종류를 확인할 수 있습니다.
예외 감싸기는 널리 알려진 예외 처리 기술입니다. 예외 감싸기를 적용한 함수에선 모든 에러를 종류별로 처리하지 않습니다. 
대신 모든 에러를 포함할 수 있는 추상 에러를 하나 만들고, 에러가 발생하면 이 추상 에러를 던지도록 합니다.
추상 에러를 던질 때 실제 발생한 에러를 추상 에러의 프로퍼티(err.cause)로 넘기면 구체적인 에러 정보를 함께 넘겨줄 수 있는데, 반드시 이 프로퍼티가 있어야 하는 것은 아닙니다.
*/

/*
SyntaxError 상속
중요도: 5
내장된 SyntaxError 클래스를 상속하는 FormatError 클래스를 만들어 봅시다.

만들어진 클래스에서 message, name, stack를 참조할 수 있어야 합니다.

참고 예시입니다.
*/

class FormatError extends SyntaxError {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}

let err = new FormatError("formatting error");

alert( err.message ); // formatting error
alert( err.name ); // FormatError
alert( err.stack ); // stack

alert( err instanceof FormatError ); // true
alert( err instanceof SyntaxError ); // true (SyntaxError 클래스를 상속받았기 때문입니다.)