/*
func.bind(context, ...args)는 this가 context로 고정되고 인수도 고정된 함수 func을 반환합니다.

bind는 보통 객체 메서드의 this를 고정해 어딘가에 넘기고자 할 때 사용합니다. setTimeout에 넘길 때 같이 말이죠.

기존 함수의 인수 몇 개를 고정한 함수를 부분 적용(partially applied) 함수 또는 부분(partial) 함수라고 부릅니다.

부분 적용은 같은 인수를 여러 번 반복하고 싶지 않을 때 유용합니다. send(from, to)라는 함수가 있는데 from을 고정하고 싶다면 send(from, to)의 부분 함수를 구현해 사용하면 됩니다.
*/

/*
bind를 적용한 함수를 메서드에 정의하기
중요도: 5
아래 코드를 실행하면 어떤 결과가 나올까요?
*/

function f() {
  alert(this); // ?
}

let user = {
  g: f.bind(null),
};

user.g();

{
function askPassword(ok, fail) {
  let password = prompt("비밀번호를 입력해주세요.", "");
  if (password == "rockstar") ok();
  else fail();
}

let user = {
  name: "John",

  loginOk() {
    alert(`${this.name}님이 로그인하였습니다.`);
  },

  loginFail() {
    alert(`${this.name}님이 로그인에 실패하였습니다.`);
  },
};

askPassword(user.loginOk.bind(user), user.loginFail.bind(user));
}