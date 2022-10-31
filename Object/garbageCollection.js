/**
 * reachabillity라는 개념을 통해 메모리 관리를 수행함.
 * 여기서 reachable 값은 어떻게든 접근하거나 사용할 수 있는 값을 말함.
 */
const user = { name : "harry" }
user = null; //참조가 사라진다. 이 때 가비지컬렉터는 user에 저장된 데이터를 삭제하고 메모리에서도 삭제한다.

const user2 = { name : "harry" }
const user2clone = user2;
user2 = null; //user2clone을 통해 user2에 접근할 수 있기 때문에 user2는 삭제되지 않는다.

