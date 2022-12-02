/*
커링은 f(a,b,c)를 f(a)(b)(c) 와 같이 다중 callable 프로세스 형태로 변환하는 기술입니다. 
보통 자바스크립트에서의 커링되어진 함수는 평소처럼 호출도 하고 만약에 인수들이 충분하지 않을 때에는 partial을 반환합니다.

커링은 partial을 쉽게 적용할 수 있도록 해줍니다. 
로그 예시에서 보았듯이 커링을 적용하면 인수 세 개의 범용 함수 log(date, importance, message)를 log(date)같이 인수가 하나인 형태나 log(date, importance)처럼 인수가 두 개인 형태로 호출할 수 있습니다.
*/