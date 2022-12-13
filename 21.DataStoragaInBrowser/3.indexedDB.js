/*
브라우저의 인덱스 DB는 로컬스토리지보다 더 막강한 기능과 성능을 가지고 있습니다.
인덱스 DB는 몇가지 특징이 있습니다.

1. 거의 모든 종류의 데이터타입을 값으로 저장할 수 있습니다.
2. 안정성을 위해 트랜잭션을 지원합니다.
3. 키 범위 쿼리, 인덱스를 지원합니다.

인덱스 DB는 일반적으로 기존의 클라이언트-서버 앱에서 사용하기엔 과한 느낌이 있습니다.
보통 웹 기반의 오프라인 앱에서 많이 사용합니다.
프라미스 기반의 래퍼를 이용하여 async/await를 사용할 수도 있습니다.
꽤 편리하지만 완벽하진 않아서 모든 경우의 이벤트를 대체할 수는 없습니다.
*/

/*
인덱스DB 작업을 시작하려면 먼저 데이터베이스를 연결해야 합니다.
*/
let openRequest = indexedDB.open(name, version);

/*
이름이 다른 데이터베이스들이 있을 수 있지만 모두 현재 오리진(도메인/프로토콜/포트) 내에 존재합니다. 
서로 다른 웹사이트는 서로의 데이터베이스에 액세스할 수 없습니다.
함수호출은 openRequest 객체를 반환하며 이벤트를 수신해야 합니다.

success: DB가 준비상태에 있습니다. openRequest객체 안에 DB 객체가 들어있어서 후에 호출을 통해 DB작업을 할 수 있습니다.
error: 연결 실패
upgradeneeded: DB가 준비상태에 있지만 버전이 만료되었습니다.

인덱스DB 에는 서버 측 데이터베이스에는 없는 "스키마 버전 관리" 메커니즘이 내장되어 있습니다.
서버 측 데이터베이스와 달리 인덱스DB는 클라이언트 측에 존재하며 데이터는 브라우저에 저장되므로 개발자는 인덱스DB에 상시 액세스할 수 없습니다. 
따라서 앱의 새 버전을 게시하고 사용자가 웹페이지를 방문하면 데이터베이스를 업데이트해야 할 수 있습니다.

로컬 데이터베이스 버전이 open함수에 지정된 것보다 낮으면 업그레이드가 필요한 특수 이벤트가 트리거되고 필요에 따라 버전을 비교하고 데이터 구조를 업그레이드할 수 있습니다.
upgradeneeded 이벤트는 데이터베이스가 아직 존재하지 않을 때도 트리거되므로(기술적으로는 버전이 0임) 초기화를 수행할 수 있습니다.
*/

let openRequest = indexedDB.open("store", 1);

openRequest.onupgradeneeded = function() {
  // triggers if the client had no database
  // ...perform initialization...
};

openRequest.onerror = function() {
  console.error("Error", openRequest.error);
};

openRequest.onsuccess = function() {
  let db = openRequest.result;
  // continue working with database using db object
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////

let openRequest = indexedDB.open("store", 2);

openRequest.onupgradeneeded = function(event) {
  // the existing database version is less than 2 (or it doesn't exist)
  let db = openRequest.result;
  switch(event.oldVersion) { // existing db version
    case 0:
      // version 0 means that the client had no database
      // perform initialization
    case 1:
      // client had version 1
      // update
  }
};

/*
인덱스DB의 버전을 이야기할 때 관련된 문제가 하나 있습니다.
두 개의 탭에 서로 다른 버전의 인덱스 DB 를 사용한다면
DB는 출처가 같은 두 탭간에 공유를 시도합니다.
그리고 두번째 탭에선 openRequest 객체는 성공 대신 차단된 이벤트를 내보냅니다.
이전 연결을 닫지 않으면 두 번째 새 연결이 만들어지지 않으므로
"오래된" 데이터베이스에 대한 모든 연결을 닫아야 합니다. 
따라서 두 번째 탭은 작동하지 않습니다.
*/

/*
인덱스DB에 무언가를 저장하려면 object store가 필요합니다.
object store는 인덱스 DB의 핵심개념입니다.
다른 DB에서 테이블, 컬렉션이라고 불리는 개념을 대체합니다.
object store는 데이터가 실질적으로 저장되는 곳이며, DB는 여러개의 object store를 가질 수 있습니다.
*/
db.createObjectStore(name[, keyOptions]);

/*
name은 object store의 이름입니다. 예) "books"
keyOptions은 object store의 옵션을 설정합니다.
keyPath – 인덱스DB에 저장될 키를 지정합니다.
autoIncrement – true 면 새로 저장된 객체의 키가 계속 증가하는 숫자로 자동 생성됩니다.

* 기술적인 문제로 인해 object store는 upgradeneeded 핸들러에서 DB 버전을 업데이트하는 동안에만 생성/수정할 수 있습니다.
*/

/*
트랜잭션이란 개념은 다양한 DB에서 널리 쓰이는 용어입니다.

인덱스DB의 모든 데이터 작업은 트랜잭션 내에서 이루어져야 합니다.
*/
db.transaction(store[, type]);

/*
store는 트랜잭션이 액세스할 object store 이름입니다. 여러 object store에 액세스하려는 경우 배열이 될 수 있습니다.

type – 트랜잭션의 타입입니다 아래 두가지 중 하나를 선택할 수 있습니다.
readonly – 읽기만 가능하며 기본값입니다.
readwrite – 읽기와 쓰기가 가능하지만 object store를 생성, 제거, 수정하진 못합니다.
*/

let transaction = db.transaction("books", "readwrite"); // (1)

// get an object store to operate on it
let books = transaction.objectStore("books"); // (2)

let book = {
  id: 'js',
  price: 10,
  created: new Date()
};

let request = books.add(book); // (3)

request.onsuccess = function() { // (4)
  console.log("Book added to the store", request.result);
};

request.onerror = function() {
  console.log("Error", request.error);
};

/*
트랜잭션 오토 커밋 원칙에는 중요한 부작용이 있습니다. 
트랜잭션 중간에 fetch, setTimeout과 같은 비동기 작업을 삽입할 수 없습니다. 
인덱스DB는 이러한 작업이 완료될 때까지 트랜잭션을 대기 상태로 유지하지 않습니다.
*/

/*
실패한 요청은 트랜잭션을 자동으로 중단하고 모든 변경 사항을 취소합니다.
하지만 필요에 따라 기존 변경 사항을 취소하지 않고 트랜잭션을 계속할 수 있습니다. 
request.onerror 핸들러에서 event.preventDefault()를 호출하여 트랜잭션 중단을 방지할 수 있습니다.

인덱스DB 이벤트는 모두 DOM 이벤트이기 때문에 모든 요청에 대해 이벤트 위임을 사용할 수도 있습니다.
인덱스DB의 이벤트는 버블링됩니다. request -> transaction -> database
그러나 만약 발생한 에러가 하위에서 이미 완전히 처리된 경우 상위로 버블링 할 필요가 없을 수 있습니다.
이 경우에는 event.stopPropagation() 메서드를 이용해서 처리가 끝난 에러는 상위로 버블링 되지 않도록 차단해줄 수 있습니다.
*/

request.onerror = function(event) {
    if (request.error.name === "ConstraintError") {
      console.log('ID already exist!');
      event.prevnetDefault();
      event.stopPropagation();
    } else {
      // 트랜잭션 중단
    }
};

/*
object store를 검색하기 위한 방법은 크게 두 가지가 있습니다.
1. key와 key range를 이용한 방법.
2. 객체 필드를 통한 방법.

첫째로 키를 이용한 방법을 알아보겠습니다.
검색과 관련된 메서드는 정확한 키 또는 소위 "범위 쿼리"("키 범위"를 지정하는 IDBKeyRange 개체)를 지원합니다.
범위는 다음 호출을 사용하여 생성됩니다.

IDBKeyRange.lowerBound(lower, [open]) ≥lower(또는 open이 true인 경우 >lower)
IDBKeyRange.upperBound(upper, [open]) ≤upper(또는 open이 true인 경우 <upper)
IDBKeyRange.bound(lower, upper, [lowerOpen], [upperOpen]) 하한과 상한 사이. open 플래그가 true이면 해당 키가 범위에 포함되지 않습니다.
IDBKeyRange.only(key) – 하나의 키로만 구성된 범위로 거의 사용되지 않습니다.

모든 검색 방법은 정확한 키 또는 키 범위일 수 있는 쿼리 인수를 허용합니다.

store.get(query) – 키 또는 범위로 첫 번째 값을 검색합니다.
store.getAll([query], [count]) – 모든 값을 검색하고 주어진 경우 개수로 제한합니다.
store.getKey(query) – 쿼리를 충족하는 첫 번째 키(일반적으로 범위)를 검색합니다.
store.getAllKeys([query], [count]) – 쿼리를 충족하는 모든 키(일반적으로 범위, 주어진 경우 최대 개수)를 검색합니다.
store.count([query]) – 쿼리를 충족하는 키의 총 개수(일반적으로 범위)를 가져옵니다.
*/

// get one book
books.get('js')

// get books with 'css' <= id <= 'html'
books.getAll(IDBKeyRange.bound('css', 'html'))

// get books with id < 'html'
books.getAll(IDBKeyRange.upperBound('html', true))

// get all books
books.getAll()

// get all keys: id > 'js'
books.getAllKeys(IDBKeyRange.lowerBound('js', true))

/*
다른 개체 필드로 검색하려면 "인덱스"라는 추가 데이터 구조를 만들어야 합니다.

인덱스는 주어진 개체 필드를 추적하는 저장소에 대한 "추가 기능"입니다. 
해당 필드의 각 값에 대해 해당 값이 있는 개체의 키 목록을 저장합니다.
*/

objectStore.createIndex(name, keyPath, [options]);

/*
name– 인덱스 이름,
keyPath– 인덱스가 추적해야 하는 개체 필드의 경로(해당 필드로 검색할 예정임),
option– 속성이 있는 선택적 객체:
unique– true인 경우 keyPath에 지정된 값을 가진 객체는 저장소에 하나만 있을 수 있습니다 . 
인덱스는 중복을 추가하려고 하면 오류를 생성하여 이를 적용합니다.
multiEntry– on 값이 keyPath배열인 경우에만 사용됩니다. 
이 경우 기본적으로 인덱스는 전체 배열을 키로 취급합니다. 
그러나 multiEntry참이면 인덱스는 해당 배열의 각 값에 대한 저장소 개체 목록을 유지합니다.
따라서 배열 구성원은 인덱스 키가 됩니다.

먼저 인덱스를 생성해야 합니다. 객체 저장소와 마찬가지로 upgradeneeded에서 수행해야 합니다.
*/

openRequest.onupgradeneeded = function() {
    // we must create the index here, in versionchange transaction
    let books = db.createObjectStore('books', {keyPath: 'id'});
    let index = books.createIndex('price_idx', 'price');
};

/*
1. 인덱스는 가격 필드를 추적합니다.
2. 가격은 고유하지 않으며 동일한 가격의 책이 여러 권 있을 수 있으므로 고유한 옵션을 설정하지 않습니다.
3. 가격은 배열이 아니므로 multiEntry 플래그를 적용할 수 없습니다.

가격의 각 값(두 번째 인수)에 대한 인덱스는 해당 가격이 있는 키 목록을 유지합니다.
인덱스는 자동으로 최신 상태를 유지하므로 신경 쓸 필요가 없습니다.
이제 주어진 가격을 검색할 때 동일한 검색 방법을 인덱스에 적용하기만 하면 됩니다.
*/

let transaction = db.transaction("books"); // readonly
let books = transaction.objectStore("books");
let priceIndex = books.index("price_idx");

let request = priceIndex.getAll(10);

request.onsuccess = function() {
  if (request.result !== undefined) {
    console.log("Books", request.result); // array of books with price=10
  } else {
    console.log("No such books");
  }
};

/*
또한 IDBKeyRange를 사용하여 범위를 생성하고 저렴하거나 비싼 책을 찾을 수 있습니다.
*/

// find books where price <= 5
let request = priceIndex.getAll(IDBKeyRange.upperBound(5));

/*
인덱스는 추적된 개체 필드(우리의 경우 가격)별로 내부적으로 정렬됩니다. 따라서 검색을 수행하면 결과도 가격순으로 정렬됩니다.
*/

/*
getAll/getAllKeys와 같은 메서드는 키/값의 배열을 반환합니다.
그러나 object 스토리지는 사용 가능한 메모리보다 클 수 있습니다. 
그렇게 되면 getAll은 모든 레코드를 배열로 가져오지 못합니다.
커서는 이를 해결하기 위한 수단을 제공합니다.
커서는 쿼리가 주어지면 개체 저장소를 순회하고 한 번에 하나의 키/값을 반환하여 메모리를 절약하는 특수 개체입니다.
object store가 키에 의해 내부적으로 정렬되므로 커서는 키 순서(기본적으로 오름차순)로 저장소를 이동합니다.
*/

// like getAll, but with a cursor:
let request = store.openCursor(query, [direction]);

// to get keys, not values (like getAllKeys): store.openKeyCursor

/*
커서의 주요 차이점은 request.onsuccess가 각 결과에 대해 한 번씩 여러 번 트리거된다는 것입니다.
*/

let transaction = db.transaction("books");
let books = transaction.objectStore("books");

let request = books.openCursor();

// called for each book found by the cursor
request.onsuccess = function() {
  let cursor = request.result;
  if (cursor) {
    let key = cursor.key; // book key (id field)
    let value = cursor.value; // book object
    console.log(key, value);
    cursor.continue();
  } else {
    console.log("No more books");
  }
};