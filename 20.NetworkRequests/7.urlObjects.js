/*
기본 제공 URL 클래스는 URL을 만들고 구문 분석하기 위한 편리한 인터페이스를 제공합니다.
*/

new URL(url, [base]);

/*
url– 전체 URL 또는 유일한 경로(기본이 설정된 경우 아래 참조),
base– 선택적 기본 URL: 설정 및 url인수에 경로만 있는 경우 URL은 base에 상대적으로 생성됩니다 

다음 두 URL은 동일합니다.
*/

let url1 = new URL("https://javascript.info/profile/admin");
let url2 = new URL("/profile/admin", "https://javascript.info");

/*
기존 URL에 상대적인 경로를 기반으로 새 URL을 쉽게 만들 수 있습니다.
*/

let url = new URL("https://javascript.info/profile/admin");
let newUrl = new URL("tester", url);

/*
검색 매개변수로 URL을 만들고 싶다면 URLSearchParams을 사용하면 됩니다.
검색 매개변수에 대한 편리한 방법을 제공합니다.
*/

let url = new URL("https://google.com/search");

url.searchParams.set("q", "test me!"); // added parameter with a space and !

alert(url); // https://google.com/search?q=test+me%21

url.searchParams.set("tbs", "qdr:y"); // added parameter with a colon :

// parameters are automatically encoded
alert(url); // https://google.com/search?q=test+me%21&tbs=qdr%3Ay

// iterate over search parameters (decoded)
for (let [name, value] of url.searchParams) {
  alert(`${name}=${value}`); // q=test me!, then tbs=qdr:y
}

