/**
 *Promise 클래스에는 5가지 정적 메서드가 있습니다.

Promise.all(promises) – 모든 프라미스가 이행될 때까지 기다렸다가 그 결괏값을 담은 배열을 반환합니다. 주어진 프라미스 중 하나라도 실패하면 Promise.all는 거부되고, 나머지 프라미스의 결과는 무시됩니다.
Promise.allSettled(promises) – 최근에 추가된 메서드로 모든 프라미스가 처리될 때까지 기다렸다가 그 결과(객체)를 담은 배열을 반환합니다. 객체엔 다음과 같은 정보가 담깁니다.
status: "fulfilled" 또는 "rejected"
value(프라미스가 성공한 경우) 또는 reason(프라미스가 실패한 경우)
Promise.race(promises) – 가장 먼저 처리된 프라미스의 결과 또는 에러를 담은 프라미스를 반환합니다.
Promise.resolve(value) – 주어진 값을 사용해 이행 상태의 프라미스를 만듭니다.
Promise.reject(error) – 주어진 에러를 사용해 거부 상태의 프라미스를 만듭니다.
 */

Promise.all([1, 2, 3]).then(console.log);
