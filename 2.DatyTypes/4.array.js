/**
 * 배열은 특수한 형태의 객체로, 순서가 있는 자료를 저장하고 관리하는 용도에 최적화된 자료구조입니다.
 * length 프로퍼티는 배열의 길이를 나타내줍니다. 정확히는 숫자형 인덱스 중 가장 큰 값에 1을 더한 값입니다. 배열 메서드는 length 프로퍼티를 자동으로 조정해줍니다.
length 값을 수동으로 줄이면 배열 끝이 잘립니다.

다음 연산을 사용하면 배열을 데큐처럼 사용할 수 있습니다.

push(...items) – items를 배열 끝에 더해줍니다.
pop() – 배열 끝 요소를 제거하고, 제거한 요소를 반환합니다.
shift() – 배열 처음 요소를 제거하고, 제거한 요소를 반환합니다.
unshift(...items) – items를 배열 처음에 더해줍니다.
아래 방법을 사용하면 모든 요소를 대상으로 반복 작업을 할 수 있습니다.

for (let i=0; i<arr.length; i++) – 가장 빠른 방법이고 오래된 브라우저와도 호환됩니다.
for (let item of arr) – 배열 요소에만 사용되는 모던한 문법입니다.
for (let i in arr) – 배열엔 절대 사용하지 마세요.
 */

/**
 * 배열과 관련된 연산
중요도: 5
배열과 관련된 다섯 가지 연산을 해봅시다.

요소 “Jazz”, "Blues"가 있는 styles 배열을 생성합니다.
"Rock-n-Roll"을 배열 끝에 추가합니다.
배열 정 중앙에 있는 요소를 "Classics"로 바꿉니다. 가운데 요소를 찾는 코드는 요소가 홀수 개인 배열에서도 잘 작동해야 합니다.
배열의 첫 번째 요소를 꺼내서 출력합니다.
"Rap"과 "Reggae"를 배열의 앞에 추가합니다.
단계를 하나씩 거칠 때마다 배열 모습은 아래와 같이 변해야 합니다.

Jazz, Blues
Jazz, Blues, Rock-n-Roll
Jazz, Classics, Rock-n-Roll
Classics, Rock-n-Roll
Rap, Reggae, Classics, Rock-n-Roll
 */

let { log } = console;

let styles = [`Jazz`, `Blues`];
log(styles);

styles.push(`Rock-n-Roll`);
log(styles);

function findCenter(arr) {
    return Math.floor((arr.length - 1) / 2);
}

styles[findCenter(styles)] = `Classics`;
log(styles);

styles.shift();
log(styles);

styles.unshift(`Rap`, `Reggae`);
log(styles);
