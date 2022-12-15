/*
패턴과 플래그

정규 표현식은 패턴과 선택적으로 사용할 수 있는 플래그 g, i, m, u, s, y로 구성됩니다.
플래그와 특수 기호(추후 학습)가 없는 경우엔 일반적인 부분 문자열 검색과 동일한 방식으로 검색이 진행됩니다.
플래그 g가 있는 경우엔 str.match(regexp)는 패턴과 일치하는 모든 부분 문자열을 검색합니다. g가 없는 경우엔 첫 번째 부분 문자열만 찾습니다.
str.replace(regexp, replacement)는 regexp과 일치하는 부분 문자열을 replacement로 교체합니다. g 플래그가 있으면 부분 문자열 전체를, 없으면 첫 번째 부분 문자열을 교체합니다.
패턴과 일치하는 부분 문자열이 하나라도 있는 경우 regexp.test(str)는 true를 반환합니다. 그렇지 않으면 false가 반환됩니다.

i 플래그가 붙으면 대·소문자 구분 없이 검색합니다. 따라서 A와 a에 차이가 없습니다(아래 예시 참조).
g 플래그가 붙으면 패턴과 일치하는 모든 것들을 찾습니다. g 플래그가 없으면 패턴과 일치하는 첫 번째 결과만 반환됩니다.
m 플래그는 다중 행 모드(multiline mode)를 활성화합니다. 자세한 내용은 앵커 ^와 $의 여러 행 모드, 'm' 플래그에서 다룰 예정입니다.
s 플래그는 .이 개행 문자 \n도 포함하도록 ‘dotall’ 모드를 활성화합니다. 자세한 내용은 문자 클래스에서 다룰 예정입니다.
u플래그는 유니코드 전체를 지원합니다. 이 플래그를 사용하면 서로게이트 쌍(surrogate pair)을 올바르게 처리할 수 있습니다. 자세한 내용은 유니코드: 'u' 플래그와 \p{...} 클래스에서 다룰 예정입니다.
y플래그는 문자 내 특정 위치에서 검색을 진행하는 ‘sticky’ 모드를 활성화 시킵니다. 자세한 내용은 Sticky flag "y", searching at position에서 다룰 예정입니다.
*/

/*
문자 클래스

문자 클래스에는 다음 클래스들이 있습니다.

\d – 숫자
\D – 숫자가 아닌 문자
\s – 스페이스, 탭, 줄 바꿈 문자
\S – \s를 제외한 모든 문자
\w – 라틴 문자, 숫자, 밑줄 '_'
\W – \w를 제외한 모든 문자
. – 정규 표현식 's' 플래그가 있으면 모든 문자, 없으면 줄 바꿈 \n을 제외한 모든 문자
하지만 이게 전부가 아닙니다!

자바스크립트에서 문자열에 사용하는 유니코드 인코딩은 문자에 여러 프로퍼티를 제공합니다. 어떤 언어에 속하는 글자인지 또는 글자가 아닌 구두점인지 알려주는 프로퍼티처럼요.

이런 프로퍼티를 기준으로 문자를 찾을 수도 있습니다. u 플래그를 사용하면 되는데요. 다음 글에서 알아보도록 하죠.
*/

/*
유니코드

u 플래그로 정규 표현식에서 유니코드 관련 기능을 활성화할 수 있습니다.

즉, 다음 두 기능이 사용 가능해집니다.

4바이트 문자를 2바이트 문자 두 개로 처리하지 않고 문자 한 개로 올바르게 처리합니다.
\p{…}를 이용해 유니코드 프로퍼티를 검색에 사용할 수 있습니다.
유니코드 프로퍼티를 사용하면 특정 언어의 단어, 따옴표나 통화 단위같은 특수 문자 등을 모두 검색할 수 있습니다.
*/

/*
앵커
*/
{
    let str1 = "Mary had a little lamb";
    console.log( /^Mary/.test(str1) ); // true

    let str2 = "it's fleece was white as snow";
    console.log( /snow$/.test(str1) ); // true
}
/*
앵커와 m 플래그
*/
{
    let str = `1st place: Winnie
    2nd place: Piglet
    3rd place: Eeyore`;

    console.log( str.match(/^\d/gm) ); // 1, 2, 3
}

/*
단어 경계 \b

\b는 앞뒤로 문자캐릭터가 있는지 아닌지 확인함.
*/

{
    console.log( "Hello, Java!".match(/\bJava\b/) ); // Java
}

/*
이스케이핑, 특수 캐릭터

임의의 문자를 찾겠다는 의미를 갖는 마침표가 아닌 진짜 문자열 마침표를 찾고 싶다면
이스케이핑을 해야한다.

RegExp 객체를 이용할땐 이스케이핑 형식이 조금 다르다.
*/

{
    console.log( "Chapter 5.1".match(/\d\.\d/) ); // 5.1 (match!)

    let regStr = "\\d\\.\\d";
    console.log(regStr); // \d\.\d (correct now)

    let regexp = new RegExp(regStr);

    console.log( "Chapter 5.1".match(regexp) ); // 5.1
}

/*
세트와 범위
*/

{
    // find [t or m], and then "op"
    console.log( "Mop top".match(/[tm]op/gi) ); // "Mop", "top"

    console.log( "Exception 0xAF".match(/x[0-9A-F][0-9A-F]/g) ); // xAF
    /*
        예를 들어 문자캐릭터인 \w와 하이픈 둘 중에 하나를 찾고 싶다면 [\w-]와 같이 사용할 수 있다.
        [\s\d]와 같이 공백이나 숫자를 찾을 수도 있다.

        \d – [0-9] 와 같음
        \w – [a-zA-Z0-9_] 와 같음
        \s – [\t\n\v\f\r ] 이외에 다른 유니코드 캐릭터와 같음
    */

    //범위에서 제외하기
    /*
    [^aeyo] – any character except 'a', 'e', 'y' or 'o'.
    [^0-9] – any character except a digit, the same as \D.
    [^\s] – any non-space character, same as \S.
    */
}

/*
퀀티파이어
*/

{
    console.log( "I'm 12345 years old".match(/\d{5}/) ); //  "12345"
    console.log( "I'm not 12, but 1234 years old".match(/\d{3,5}/) ); // "1234"
    console.log( "I'm not 12, but 345678 years old".match(/\d{3,}/) ); // "345678"

    let str = "+7(903)-123-45-67";
    let numbers = str.match(/\d{1,}/g);
    console.log(numbers); // 7,903,123,45,67
}
{
    //shorthand
    let str = "+7(903)-123-45-67";
    console.log( str.match(/\d+/g) ); // 7,903,123,45,67

    let str2 = "Should I write color or colour?"; // ? is same as {0, 1}
    console.log( str2.match(/colou?r/g) ); // color, colour

    console.log( "100 10 1".match(/\d0*/g) ); // 100, 10, 1  {0, }

    console.log( "100 10 1".match(/\d0+/g) ); // 100, 10
    // 1 not matched, as 0+ requires at least one zero

    console.log( "<h1>Hi!</h1>".match(/<\/?[a-z][a-z0-9]*>/gi) ); // <h1>, </h1>
}

/*
탐욕, 지연 퀀티파이어
퀀티파이어는 두 가지 작업 모드가 있습니다.

탐욕 : 
기본적으로 정규식 엔진은 수량자를 가능한 한 많이 반복하려고 시도합니다. 
예를 들어 \d+는 가능한 모든 숫자를 사용합니다. 
더 이상 사용할 수 없게 되면(숫자 또는 문자열 끝이 더 이상 없음) 나머지 패턴과 계속 일치합니다. 
일치하는 항목이 없으면 반복 횟수(역추적)를 줄이고 다시 시도합니다.

지연 :
퀀티파이어 뒤에 ?를 붙여 활성화 합니다. 
regexp 엔진은 수량자를 반복하기 전에 패턴의 나머지 부분을 일치시키려고 시도합니다.

살펴본 바와 같이 지연 모드는 탐욕 검색의 "만병통치약"이 아닙니다. 
대안은 "[^"]+" 패턴에서와 같이 제외 항목이 있는 "미세 조정된" 탐욕 검색입니다.
*/