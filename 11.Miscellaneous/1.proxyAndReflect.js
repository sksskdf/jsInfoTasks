/*


리플렉트는 프락시를 좀 더 편하게 쓸 수 있게 해주는 내장객체입니다.
[[Get]]이나 [[Set]]과 같은 내부메서드는 외부에서 호출하지 못한다는 단점이 있었습니다.
리플렉트는 이러한 동작을 가능하게 해줍니다.
리플렉트에서 제공하는 메서드는 프락시에서의 내부메서드에 대한 래퍼입니다.

다음은 예시입니다.
let user = {};

Reflect.set(user, 'name', 'John');

alert(user.name); // John

리플렉트를 사용하면 예시와 같이  프락시메서드를 함수로 호출할 수 있습니다.
모든 내부메서드는 프락시에 의해서 트랩에 걸리게 할 수 있습니다.
이러한 프락시 트랩과 상응하는 메서드가 리플렉트에 있는것이죠.

다음 예시와 같이 프락시와 리플렉트를 사용할 수 있습니다.

let user = {
  name: "John",
};

user = new Proxy(user, {
  get(target, prop, receiver) {
    alert(`GET ${prop}`);
    return Reflect.get(target, prop, receiver); // (1)
  },
  set(target, prop, val, receiver) {
    alert(`SET ${prop}=${val}`);
    return Reflect.set(target, prop, val, receiver); // (2)
  }
});

let name = user.name; // shows "GET name"
user.name = "Pete"; // shows "SET name=Pete"

하지만 대부분의 경우 리플렉트 없이도 target[prop]과 같이 동일한 작업을 수행할 수 있습니다.

이제 왜 Reflect.get이 target[prop]보다 나은지 알아봅시다.
그리고  get/set 내부메서드가 세번째 인자로 이전까지 사용하지 않았던 receiver를 받는지에 대해서도 알아봅시다.

예시를 살펴봅시다.
let user = {
  _name: "Guest",
  get name() {
    return this._name;
  }
};

let userProxy = new Proxy(user, {
  get(target, prop, receiver) {
    return target[prop];
  }
});

alert(userProxy.name); // Guest

위 코드에서 get 트랩은 투명하게 작동합니다.
별 문제가 없어보이지만, 예제를 좀 더 복잡하게 해봅시다.

user객체로 부터 상속받은 admin객체에선 정상적으로 동작하지 않는 부분이 있음을 알 수 있습니다.

let user = {
  _name: "Guest",
  get name() {
    return this._name;
  }
};

let userProxy = new Proxy(user, {
  get(target, prop, receiver) {
    return target[prop]; // (*) target = user
  }
});

let admin = {
  __proto__: userProxy,
  _name: "Admin"
};

// Expected: Admin
alert(admin.name); // outputs: Guest (?!?)
분명 admin.name은 Admin을 반환해야 하는데 Guest를 반환합니다.
무엇이 문제일까요?
여기서 프락시를 제거하면 문제없이 잘 작동합니다.
모든 문제의 원인은 (*)표시가 되어있는 프락시에 있습니다.

1. admin.name을 읽을 때 admin 개체에는 이러한 name과 같은 속성이 없으므로 검색은 해당 프로토타입으로 이동합니다. (admin에선 속성이름이 _name이죠)
2. 프로토타입은 userProxy입니다.
3. 프락시에서 name속성을 읽을 때 해당 get트랩이 트리거되어 원본 개체에서 target[prop]을 반환합니다.
    prop이 getter일 때 target[prop]에 대한 호출은 this=target 컨텍스트에서 코드를 실행합니다. 따라서 결과는 원래 개체 대상의 this._name입니다. 즉, from user입니다.

이러한 상황을 해결하려면 receiver가 필요합니다.
올바른 this를 getter에 전달하도록 합니다. 
우리의 경우 admin이 되겠죠.

Reflect.get이 이러한 일을 해줍니다.

let user = {
  _name: "Guest",
  get name() {
    return this._name;
  }
};

let userProxy = new Proxy(user, {
  get(target, prop, receiver) { // receiver = admin
    return Reflect.get(target, prop, receiver); // (*)
  }
});


let admin = {
  __proto__: userProxy,
  _name: "Admin"
};

alert(admin.name); // Admin

이제 올바른 this(즉, admin)에 대한 참조를 유지하는 receiver는 라인(*)에서 Reflect.get을 사용하여 getter로 전달됩니다.
코드를 좀 더 짧게 쓸 수도 있습니다.

get(target, prop, receiver) {
  return Reflect.get(...arguments);
}

프락시는 가장 낮은 수준에서 기존 개체의 동작을 변경할 수 있는 방법을 제공합니다. 
그래도 완벽하지는 않습니다. 
프락시엔 한계가 있습니다.

Map, Set, Date, Promise와 같은 많은 내장 객체에는 내부 슬롯이라는 것을 사용합니다.
내부 슬롯은 프로퍼티와 같지만, 내장 객체의 전용 목적으로 예약되어 있습니다.
예를 들어 Map은 내부슬롯인 [[MapData]]에 요소를 저장합니다.
내부 메서드에선 [[Get]], [[Set]]을 사용하지 않고 내부슬롯에 직접적으로 접근합니다.
그러므로 프락시가 이것을 가로챌 순 없습니다.

내장 객체가 프락시된 후 프락시에는 이러한 내부 슬롯이 없으므로 기본 제공 메서드가 실패합니다.
예시입니다.

let map = new Map();

let proxy = new Proxy(map, {});

proxy.set('test', 1); // Error

프락시에는 내부슬롯이 없으므로, 내장 메서드 Map.prototype.set 메서드는 내부 속성 this.[[MapData]]에 액세스하려고 시도하지만 this=proxy이기 때문에 프락시에서 찾을 수 없고 실패합니다.

let map = new Map();

let proxy = new Proxy(map, {
  get(target, prop, receiver) {
    let value = Reflect.get(...arguments);
    return typeof value == 'function' ? value.bind(target) : value;
  }
});

proxy.set('test', 1);
alert(proxy.get('test')); // 1 (works!)

이제 get 트랩이 map.set과 같은 함수 속성을 대상 개체(map) 자체에 바인딩하므로 제대로 작동합니다.
이전 예제와 달리 proxy.set(...) 내부의 this 값은 프락시가 아니라 원본 맵이 됩니다. 따라서 set의 내부 구현이 this.[[MapData]] 내부 슬롯에 액세스하려고 하면 성공합니다.

private필드에서도 이러한 비슷한 문제가 발생합니다.
예시에선  getName() 메서드는 전용 #name 속성에 액세스하고 프락시 후 중단합니다.

class User {
  #name = "Guest";

  getName() {
    return this.#name;
  }
}

let user = new User();

user = new Proxy(user, {});

alert(user.getName()); // Error

그 이유는 private 필드가 내부 슬롯을 사용하여 구현되기 때문입니다. JavaScript는 접근할 때 [[Get]]/[[Set]]을 사용하지 않습니다.
getName()을 호출할 때 this의 값은 프락시된 user객체이며 개인 필드가 있는 슬롯이 없습니다.

class User {
  #name = "Guest";

  getName() {
    return this.#name;
  }
}

let user = new User();

user = new Proxy(user, {
  get(target, prop, receiver) {
    let value = Reflect.get(...arguments);
    return typeof value == 'function' ? value.bind(target) : value;
  }
});

alert(user.getName()); // Guest

이러한 방법에는 단점이 있습니다. 
원래 객체를 메서드에 노출하여 잠재적으로 추가 전달을 허용하고 프락시된 다른 기능을 손상시킬 수 있습니다.

프락시와 원래 객체는 다른 객체입니다. 따라서 원래 객체를 키로 사용한 다음 이를 프락시하면 프락시를 찾을 수 없습니다.

let allUsers = new Set();

class User {
  constructor(name) {
    this.name = name;
    allUsers.add(this);
  }
}

let user = new User("John");

alert(allUsers.has(user)); // true

user = new Proxy(user, {});

alert(allUsers.has(user)); // false

프락시가 다른 객체이기 때문에 프락싱 후 allUsers에서 user를 찾을 수 없습니다.

취소가 가능한 프락시는 비활성화할 수 있는 프락시입니다.
리소스가 있고 언제든지 액세스를 닫고 싶다고 가정해 보겠습니다. 
우리가 할 수 있는 것은 트랩 없이 취소 가능한 프락시로 래핑하는 것입니다. 
이러한 프락시는 개체에 작업을 전달하며 언제든지 비활성화할 수 있습니다.

let {proxy, revoke} = Proxy.revocable(target, handler);

이러한 호출은 프락시가 있는 객체와 해당 프락시를 비활성화 할수 있는 함수를 반환합니다.

let object = {
  data: "Valuable data"
};

let {proxy, revoke} = Proxy.revocable(object, {});

// pass the proxy somewhere instead of object...
alert(proxy.data); // Valuable data

// later in our code
revoke();

// the proxy isn't working any more (revoked)
alert(proxy.data); // Error

revoke()를 호출하면 프록시에서 대상 개체에 대한 모든 내부 참조가 제거되므로 더 이상 연결되지 않습니다. 
대상 객체는 그 후에 가비지컬렉터의 대상이 될 수 있습니다.


요약 :
프록시는 개체에 대한 작업을 개체에 전달하고 선택적으로 일부를 가로채는(트래핑) 래퍼입니다. 
클래스와 함수를 포함하여 모든 종류의 개체를 래핑할 수 있습니다.

let proxy = new Proxy(target, {
   traps 
});

우리는 어디에서나 대상 대신 프록시를 사용해야 합니다. 프록시에는 고유한 속성이나 메서드가 없습니다. 트랩이 제공되면 작업을 트랩하고, 그렇지 않으면 대상 객체로 전달합니다.
다음을 트래핑 수 있습니다. 
속성 읽기(get), 쓰기(set), 삭제(deleteProperty)(존재하지 않는 속성도 포함). 함수 호출(트랩 적용). 새 연산자(트랩 구성). 다른 많은 작업

이를 통해 "가상" 속성 및 메서드를 만들고, 기본값, 관찰 가능한 개체, 함수 데코레이터 등을 구현할 수 있습니다.
또한 다양한 프록시로 개체를 여러 번 래핑하여 다양한 기능 측면으로 장식할 수 있습니다.
Reflect API는 프록시를 보완하도록 설계되었습니다. 프록시 트랩에는 동일한 인수를 사용하는 Reflect 호출이 있습니다. 호출을 대상 개체로 전달하는 데 사용해야 합니다.

프록시에는 몇 가지 제한 사항이 있습니다. 
내장 개체에는 "내부 슬롯"이 있으며 이에 대한 액세스는 프록시할 수 없습니다. 
슬롯을 사용하여 내부적으로 구현되기 때문에 비공개 필드에 대해서도 마찬가지입니다. 
따라서 프록시된 메서드 호출에 액세스하려면 대상 개체가 this 여야 합니다. 
*/

{
  let target = {};
  let proxy = new Proxy(target, {});

  proxy.test = 5;
  console.log(target.test);

  let numbers = [1, 2, 3];
  numbers = new Proxy(numbers, {
    get(target, prop) {
      if (prop in target) {
        return target[prop];
      } else {
        return 0;
      }
    },
  });

  console.log(numbers[111]);

  numbers = [1, 2, 3, 4];

  console.log(numbers[5]);
}
{
  let numbers = [];
  numbers = new Proxy(numbers, {
    set(target, prop, val) {
      if (typeof val == "number") {
        target[prop] = val;
        return true;
      } else {
        return false;
      }
    },
  });

  //   numbers.push("a");
}

/*
존재하지 않는 프로퍼티를 읽으려고 할 때 에러 던지기
존재하지 않는 프로퍼티 값을 읽으려고 하면 보통은 undefined가 반환됩니다.

undefined 대신 에러를 던지는 프락시를 만들어봅시다.

이렇게 해 놓으면 프로그래밍 중에 저지르는 실수를 미연에 방지할 수 있을 겁니다.

객체 target을 받는 함수 wrap(target)를 만들고 위에서 언급한 기능을 구현하여 함수 wrap(target)이 프락시를 반환하도록 해보세요.

함수는 아래와 같이 동작해야 합니다.
*/

{
  let user = {
    name: "John",
  };

  function wrap(target) {
    return new Proxy(target, {
      get(target, prop, receiver) {
        if (prop in target) {
          return Reflect.get(...arguments);
        } else {
          throw new ReferenceError(`Property doesn't exist: "${prop}"`);
        }
      },
    });
  }

  user = wrap(user);

  console.log(user.name); // John
  //   console.log(user.age); // ReferenceError: Property doesn't exist "age"
}

/*
음수 인덱스를 사용해 배열 요소에 접근하기
몇몇 프로그래밍 언어는 음수 인덱스를 사용해 배열 끝을 기준으로 요소에 접근할 수 있게 해줍니다.

아래와 같이 말이죠.

let array = [1, 2, 3];

array[-1]; // 3, 마지막 요소
array[-2]; // 2, 뒤에서 두 번째 요소
array[-3]; // 1, 뒤에서 세 번째 요소
위 예시에서 array[-N]는 array[array.length - N]와 동일합니다.

이렇게 음수 인덱스를 사용해 배열 요소에 접근할 수 있도록 해주는 프락시를 만들어봅시다.

최종 결과는 아래 조건을 만족해야 합니다.
*/

{
  let array = [1, 2, 3];

  array = new Proxy(array, {
    get(target, prop, receiver) {
      if (prop < 0) {
        prop = +prop + target.length;
      }

      return Reflect.get(target, prop, receiver);
    },
  });

  console.log(array[-1]); // 3
  console.log(array[-2]); // 2

  // 배열 기능은 "변함없이 그대로" 동작해야 합니다.
}

/*
Observable 만들기
프락시를 반환해 ‘객체를 observable 하게 만들어주는’ 함수 makeObservable(target)를 만들어보세요.

최종 결과는 아래 조건을 만족해야 합니다.
*/
{
let handlers = Symbol('handlers');

function makeObservable(target) {
    // 1. 핸들러를 저장할 곳을 초기화합니다.
  target[handlers] = [];

  // 나중에 호출될 것을 대비하여 핸들러 함수를 배열에 저장합니다.
  target.observe = function(handler) {
    this[handlers].push(handler);
  };

   // 2. 변경을 처리할 프락시를 만듭니다.
   return new Proxy(target, {
    set(target, property, value, receiver) {
      let success = Reflect.set(...arguments); // 동작을 객체에 전달합니다.
      if (success) { // 에러 없이 프로퍼티를 제대로 설정했으면
        // 모든 핸들러를 호출합니다.
        target[handlers].forEach(handler => handler(property, value));
      }
      return success;
    }
  });
}

let user = {};
user = makeObservable(user);

user.observe((key, value) => {
  alert(`SET ${key}=${value}`);
});

user.name = "John"; // alerts: SET name=John
}

/*
makeObservable가 반환하는 객체는 기존 객체와 동일지만 프로퍼티가 변경될 때 호출되는 함수인 handler를 설정해주는 메서드 observe(handler)가 있어야 합니다.

프로퍼티가 변경될 때마다 프로퍼티 키와 값을 인수로 받는 메서드 handler(key, value)가 호출되어야 하죠.

참고: 이 문제에선 프로퍼티에 값을 쓰려는 경우만 고려해서 답을 작성해보세요. 읽기 등의 동작은 유사한 방법을 사용해 구현할 수 있습니다.
  */
