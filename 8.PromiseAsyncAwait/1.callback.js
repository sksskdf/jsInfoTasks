/**
 * 자바스크립트 코드는 비동기적으로 실행된다.
 * 외부 스크립트를 읽고 다음 동작을 실행해야 하는 경우 스크립트로드 코드 이후의 코드는 스크립트로드를 기다려주지 않는다.
 * 이런 경우 콜백을 사용하여 비동기적 코드실행 특징을 갖는 자바스크립트 코드를 동기적으로 실행할 수 있다.
 * 이러한 프로그래밍 기법을 콜백기반 비동기적 프로그래밍이라고 한다.
 */

 function loadScript(src, callback) {
    let script = document.createElement('script');
    script.src = src;
  
    script.onload = () => callback(script); //스크립트 로드가 끝나면 콜백 함수를 실행한다.
  
    document.head.append(script);
  }

loadScript('https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js', script => {
  alert(`${script.src}가 로드되었습니다.`);
});