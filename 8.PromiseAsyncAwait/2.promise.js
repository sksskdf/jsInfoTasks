/**
 * 콜백은 꼬리에 꼬리를 무는 비동기 동작이 많아질수록 '콜백지옥'이라고 불리는 패턴을 만들어 낸다.
 * 프라미스 객체를 사용하면 이러한 콜백지옥패턴을 피할 수 있다.
 * 프라미스 객체는 성공과 실패여부를 반환한다.
 * 그리고 .then 메서드를 통해 성공과 실패 시 동작을 정의할 수 있다.
 * 프라미스를 사용하면 흐름이 자연스럽고 유연한 코드를 작성할 수 있다.
 */

let promise = new Promise((res, rej) => {
    // res(`와우`);
    rej(new Error(`허걱`));
});

promise.then(res => console.log(res)).catch(rej => console.log(rej.message)).finally(() => console.log("끝"));

/**
 * 두 번 resolve 하기?
아래 코드의 실행 결과를 예측해보세요.

let promise = new Promise(function(resolve, reject) {
  resolve(1);

  setTimeout(() => resolve(2), 1000);
});

promise.then(alert);
 */

