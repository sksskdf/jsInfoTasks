/**
 * 객체는 몇 가지 특수한 기능을 가진 연관 배열(associative array)이다.

객체는 프로퍼티(키-값 쌍)를 저장한다.

프로퍼티 키는 문자열이나 심볼이어야 한다. 보통은 문자열이다.
값은 어떤 자료형도 가능하다.
아래와 같은 방법을 사용하면 프로퍼티에 접근할 수 있다.

점 표기법: obj.property
대괄호 표기법 obj["property"]. 대괄호 표기법을 사용하면 obj[varWithKey]같이 변수에서 키를 가져올 수 있다.
객체엔 다음과 같은 추가 연산자를 사용할 수 있다.

프로퍼티를 삭제하고 싶을 때: delete obj.prop
해당 key를 가진 프로퍼티가 객체 내에 있는지 확인하고자 할 때: "key" in obj
프로퍼티를 나열할 때: for (let key in obj)
지금까진 '순수 객체(plain object)'라 불리는 일반 객체에 대해 학습했다.

자바스크립트에는 일반 객체 이외에도 다양한 종류의 객체가 있습니다.

Array – 정렬된 데이터 컬렉션을 저장할 때 쓰임
Date – 날짜와 시간 정보를 저장할 때 쓰임
Error – 에러 정보를 저장할 때 쓰임
기타 등등
객체마다 고유의 기능을 제공하는데, 이에 대해선 추후 학습하겠다. 
사람들은 종종 'Array 타입’이나 'Date 타입’이라는 용어를 쓰곤 한다. 
사실 Array와 Date는 독립적인 자료형이 아니라 '객체’형에 속한다. 
객체에 다양한 기능을 넣어 확장한 또 다른 객체인것이다.

객체는 다재다능한 자료구조로 자바스크립트에서 그 영향력이 막강하다. 
지금까진 객체라는 거대한 주제의 극히 일부만 다루었다. 
튜토리얼 뒤쪽에서 객체에 대한 더 상세한 내용을 다루도록 하겠다.
 */

/**
 * 1. Hello, Object
 * write appropriate code follow procedure
 * - create empty object 'user'
 * - add property key is name, value is John to user Object
 * - add property key is surname, value is Smith to user Object
 * - modify value to Pete which is key is name
 * - delete name property from user Object
 */

function helloObject() {
    const user = {};
    user.name = 'John';
    user.surname = 'Smith';
    user.name = 'Pete';
    delete user.name;
}

/**
 * 2. Check Object is empty
 * write the function isEmpty(obj) which is return true if the object has no properties, return false otherwise.
 */

function isEmpty(obj) {
    for (let key in obj) {
        return false;
    }

    return true;
}

/**
 * 3. Sum object properties
 * We have an object storing salaries of our team:
 * let salaries = {
  John: 100,
  Ann: 160,
  Pete: 130
}

Write the code to sum all salaries and store in the variable sum. Should be 390 in the example above.

If salaries is empty, then the result must be 0.
 */

function sumProps(obj) {
    let sum = 0;

    for (let key in obj) {
        sum += obj[key];
    }

    return sum;
}

/**
 * 3. Multiply numeric property values by 2
 * Create a function multiplyNumeric(obj) that multiplies all numeric property values of obj by 2.
 */

function multProps(obj) {
    for (let key in obj) {
        if (typeof obj[key] == 'number') {
            obj[key] *= 2;
        }
    }
}