/**
 * function 앞에 async 키워드를 추가하면 두 가지 효과가 있습니다.

함수는 언제나 프라미스를 반환합니다.
함수 안에서 await를 사용할 수 있습니다.
프라미스 앞에 await 키워드를 붙이면 자바스크립트는 프라미스가 처리될 때까지 대기합니다. 처리가 완료되면 조건에 따라 아래와 같은 동작이 이어집니다.

에러 발생 – 예외가 생성됨(에러가 발생한 장소에서 throw error를 호출한 것과 동일함)
에러 미발생 – 프라미스 객체의 result 값을 반환
async/await를 함께 사용하면 읽고, 쓰기 쉬운 비동기 코드를 작성할 수 있습니다.

async/await를 사용하면 promise.then/catch가 거의 필요 없습니다. 하지만 가끔 가장 바깥 스코프에서 비동기 처리가 필요할 때같이 promise.then/catch를 써야만 하는 경우가 생기기 때문에 
async/await가 프라미스를 기반으로 한다는 사실을 알고 계셔야 합니다. 여러 작업이 있고, 이 작업들이 모두 완료될 때까지 기다리려면 Promise.all을 활용할 수 있다는 점도 알고 계시기 바랍니다.
 */

async function helloAsync() {
  throw new Error(`wow`);
}

helloAsync().catch((rej) => console.log(rej.message));

(async () => {
  console.log(`1`);
  await new Promise((res, rej) => setTimeout(res, 3000));
  console.log(`2`);
})();

/**
 * async와 await를 사용하여 코드 변경하기
프라미스 체이닝 챕터의 예시 중 하나를 .then/catch 대신 async/await를 사용해 다시 작성해봅시다.
 */

function loadJson(url) {
  return fetch(url).then((response) => {
    if (response.status == 200) {
      return response.json();
    } else {
      throw new Error(response.status);
    }
  });
}

loadJson("no-such-user.json").catch(alert); // Error: 404

//my solution
async function anotherLoadJson(url) {
  try {
    let res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log(error.status); //error status를 리턴하지 않음
  }
}

//another solution
async function loadJson(url) {
  // (1)
  let response = await fetch(url); // (2)

  if (response.status == 200) {
    let json = await response.json(); // (3)
    return json;
  }

  throw new Error(response.status);
}

loadJson("no-such-user.json").catch(alert); // Error: 404 (4)

/**
 * async와 await를 사용해서 '다시 던지기' 예시 재작성하기
프라미스 체이닝 챕터에서 다뤘던 ‘다시 던지기(rethrow)’ 관련 예시를 기억하실 겁니다. 이 예시를 .then/catch 대신 async/await를 사용해 다시 작성해 봅시다.

그리고 demoGithubUser 안의 반복(recursion)은 반복문(loop)을 사용해 작성하도록 합시다. async/await를 사용하면 쉽게 작성할 수 있습니다.
 */

class HttpError extends Error {
  constructor(response) {
    super(`${response.status} for ${response.url}`);
    this.name = "HttpError";
    this.response = response;
  }
}

function loadJson(url) {
  return fetch(url).then((response) => {
    if (response.status == 200) {
      return response.json();
    } else {
      throw new HttpError(response);
    }
  });
}

// 유효한 사용자를 찾을 때까지 반복해서 username을 물어봄
function demoGithubUser() {
  let name = prompt("GitHub username을 입력하세요.", "iliakan");

  return loadJson(`https://api.github.com/users/${name}`)
    .then((user) => {
      alert(`이름: ${user.name}.`);
      return user;
    })
    .catch((err) => {
      if (err instanceof HttpError && err.response.status == 404) {
        alert("일치하는 사용자가 없습니다. 다시 입력해 주세요.");
        return demoGithubUser();
      } else {
        throw err;
      }
    });
}

demoGithubUser();

//solution
class HttpError extends Error {
  constructor(response) {
    super(`${response.status} for ${response.url}`);
    this.name = "HttpError";
    this.response = response;
  }
}

async function loadJson(url) {
  let response = await fetch(url);
  if (response.status == 200) {
    return response.json();
  } else {
    throw new HttpError(response);
  }
}

// 유효한 사용자를 찾을 때까지 반복해서 username을 물어봄
async function demoGithubUser() {
  let user;
  while (true) {
    let name = prompt("GitHub username을 입력하세요.", "iliakan");

    try {
      user = await loadJson(`https://api.github.com/users/${name}`);
      break; // 에러가 없으므로 반복문을 빠져나옵니다.
    } catch (err) {
      if (err instanceof HttpError && err.response.status == 404) {
        // 얼럿 창이 뜬 이후에 반복문은 계속 돕니다.
        alert("일치하는 사용자가 없습니다. 다시 입력해 주세요.");
      } else {
        // 알 수 없는 에러는 다시 던져집니다.
        throw err;
      }
    }
  }

  alert(`이름: ${user.name}.`);
  return user;
}

demoGithubUser();
