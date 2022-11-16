/**
 * 자바스크립트엔 세 종류의 따옴표가 있는데, 이 중 하나인 백틱은 문자열을 여러 줄에 걸쳐 쓸 수 있게 해주고 문자열 중간에 ${…}을 사용해 표현식도 넣을 수 있다는 점이 특징입니다.
자바스크립트에선 UTF-16을 사용해 문자열을 인코딩합니다.
\n 같은 특수 문자를 사용할 수 있습니다. \u...를 사용하면 해당 문자의 유니코드를 사용해 글자를 만들 수 있습니다.
문자열 내의 글자 하나를 얻으려면 대괄호 []를 사용하세요.
부분 문자열을 얻으려면 slice나 substring을 사용하세요.
소문자로 바꾸려면 toLowerCase, 대문자로 바꾸려면 toUpperCase를 사용하세요.
indexOf를 사용하면 부분 문자열의 위치를 얻을 수 있습니다. 부분 문자열 여부만 알고 싶다면 includes/startsWith/endsWith를 사용하면 됩니다.
특정 언어에 적합한 비교 기준 사용해 문자열을 비교하려면 localeCompare를 사용하세요. 이 메서드를 사용하지 않으면 글자 코드를 기준으로 문자열이 비교됩니다.
이외에도 문자열에 쓸 수 있는 유용한 메서드 몇 가지가 있습니다.

str.trim() – 문자열 앞과 끝의 공백 문자를 다듬어 줍니다(제거함).
str.repeat(n) – 문자열을 n번 반복합니다.
이 외의 메서드는 MDN 문서에서 확인해보시기 바랍니다.
 */

/**
 * 첫 글자를 대문자로 변경하기
중요도: 5
str의 첫 글자를 대문자로 바꿔 반환하는 함수, ucFirst(str)를 만들어보세요. 함수 실행 결과는 아래 예시를 충족해야 합니다.
 */

function ucFirst(str) {
    let newStr = ``;
    newStr += str[0].toUpperCase();
    newStr += str.slice(1);
    return newStr;
}

console.log(ucFirst("john") == "John");

function ucFirstSolution(str) {
    if (!str) return str; //빈문자열이면 그냥 return

    return str[0].toUpperCase() + str.slice(1);
}
