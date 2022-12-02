/*
import(module) 표현식은 모듈을 읽고 이 모듈이 내보내는 것들을 모두 포함하는 객체를 담은 이행된 프라미스를 반환합니다. 호출은 어디서나 가능합니다.

코드 내 어디에서 동적으로 사용할 수도 있습니다.

let modulePath = prompt("어떤 모듈을 불러오고 싶으세요?");

import(modulePath)
  .then(obj => <모듈 객체>)
  .catch(err => <로딩 에러, e.g. 해당하는 모듈이 없는 경우>)

  아래와 같이 코드를 작성하면 모듈을 동적으로 불러올 수 있습니다.

let {hi, bye} = await import('./say.js');

hi();
bye();
say.js에 default export를 추가해보겠습니다.

// 📁 say.js
export default function() {
  alert("export default한 모듈을 불러왔습니다!");
}
default export 한 모듈을 사용하려면 아래와 같이 모듈 객체의 default 프로퍼티를 사용하면 됩니다.

let obj = await import('./say.js');
let say = obj.default;
// 위 두 줄을 let {default: say} = await import('./say.js'); 같이 한 줄로 줄일 수 있습니다.

say();
*/