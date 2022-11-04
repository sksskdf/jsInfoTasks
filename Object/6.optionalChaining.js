/**
 * 옵셔널 체이닝을 쓰면 프로퍼티가 없는 중첩 객체를 에러 없이 안전하게 접근할 수 있다.
 * ?. 은 ?. 앞의 평가 대상이 undefined나 null 이면 평가를 멈추고 undefined를 반환한다.
 */

let { log, debug } = console;

let user = {};
log(user?.address?.street); //undefined

let user2 = null;
log(user2?.adreess); //undefined

/**
 * 옵셔널 체이닝은 존재하지 않아도 괜찮은 대상에만 사용해야 한다.
 * 사용자 주소를 다루는 위 예시의 논리상 user는 반드시 있어야 하지만 address는 필수값이 아니다.
 * 그러니 user.address?.street 를 사용하는것이 바람직하다.
 * 실수로 user에 값을 할당하지 않았다면 바로 알아낼 수 있도록 해야 한다.
 * 그렇지 않으면 디버깅이 어려워 질 것이다.
 * 
 * ?앞의 변수가 선언되어있지 않다면 에러가 발생한다.
 */

//log(user3?.address); //error

/**
 * ?.은 함수나 대괄호와 같이 동작하는 특별한 문법 구조체(syntax constructor)이다.
 * ?. 는 읽거나 삭제엔 사용할 수 있지만 쓰기엔 사용할 수 없다.
 */

let user3 = {
    admin() {
        alert("관리자 계정입니다.");
    }
}

let user4 = {};

user3.admin?.(); // 관리자 계정입니다.
user4.admin?.();


let user5 = {
    firstName: "Violet"
};

let user6 = null; // user2는 권한이 없는 사용자라고 가정해봅시다.

let key = "firstName";

alert(user5?.[key]); // Violet
alert(user2?.[key]); // undefined

alert(user5?.[key]?.something?.not?.existing); // undefined



