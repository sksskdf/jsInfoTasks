/*
일반적인 이터레이터와 제너레이터는 데이터를 가져오는 데 시간이 걸리지 않을 때에 적합합니다.

그런데 약간의 지연이 있어서 데이터가 비동기적으로 들어오는 경우 async 이터레이터와 async 제너레이터, for..of대신 for await..of를 사용하게 됩니다.

일반 이터레이터와 async 이터레이터의 문법 차이는 다음과 같습니다.

                                                iterable	async iterable
iterator를 반환하는 메서드	Symbol.iterator	Symbol.asyncIterator
next()가 반환하는 값	{value:…, done: true/false}	{value:…, done: true/false}를 감싸는 Promise
일반 제너레이터와 async 제너레이터의 문법 차이는 다음과 같습니다.

generators	async generator
선언	function*	async function*
next()가 반환하는 값	{value:…, done: true/false}	{value:…, done: true/false}를 감싸는 Promise
웹 개발을 하다 보면 띄엄띄엄 들어오는 데이터 스트림을 다뤄야 하는 경우가 자주 생깁니다. 용량이 큰 파일을 다운로드하거나 업로드 할 때와 같이 말이죠.

이런 데이터를 처리할 때 async 제너레이터를 사용할 수 있습니다. 참고로 브라우저 등의 몇몇 호스트 환경은 데이터 스트림을 처리할 수 있게 해주는 API인 Streams을 제공하기도 합니다. 
Streams API에서 제공하는 특별한 인터페이스를 사용하면, 데이터를 변경하여 한 스트림에서 다른 스트림으로 데이터를 전달할 수 있습니다. 
따라서 한쪽에서 받은 데이터를 다른 쪽에 즉각 전달하는 게 가능해집니다.
*/

{
  function* generateSequence(start, end) {
    for (let i = start; i <= end; i++) {
      yield i;
    }
  }

  let resultArr = [1, 2, 3, 4, 5, 6];

  [...generateSequence(1, resultArr.length)].forEach((e) => console.log(e));
}

/*
    Github UseCase
*/
{
  async function* fetchCommits(repo) {
    let url = `https://api.github.com/repos/${repo}/commits`;

    while (url) {
      const response = await fetch(url, {
        // (1)
        headers: { "User-Agent": "Our script" }, // GitHub는 모든 요청에 user-agent헤더를 강제 합니다.
      });

      const body = await response.json(); // (2) 응답은 JSON 형태로 옵니다(커밋이 담긴 배열).

      // (3) 헤더에 담긴 다음 페이지를 나타내는 URL을 추출합니다.
      let nextPage = response.headers.get("Link").match(/<(.*?)>; rel="next"/);
      nextPage = nextPage?.[1];

      url = nextPage;

      for (let commit of body) {
        // (4) 페이지가 끝날 때까지 커밋을 하나씩 반환(yield)합니다.
        yield commit;
      }
    }
  }

  (async () => {
    let count = 0;

    for await (const commit of fetchCommits(
      "javascript-tutorial/en.javascript.info"
    )) {
      console.log(commit.author.login);

      if (++count == 100) {
        // 100번째 커밋에서 멈춥니다.
        break;
      }
    }
  })();
}
