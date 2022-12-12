/*
submit 이벤트는 폼을 제출할 때 트리거 되는데, 주로 폼을 서버로 전송하기 전에 내용을 검증하거나 폼 전송을 취소할 때 사용합니다.

한편, form.submit() 메서드는 자바스크립트만으로 폼 전송을 하고자 할 때 사용합니다. submit()메서드는 동적으로 폼을 생성하고 서버에 보내고자 할 때 사용합니다.

폼을 전송하는 방법은 크게 두 가지가 있습니다.

<input type="submit">이나 <input type="image"> 클릭하기
인풋 필드에서 Enter 키 누르기
두 방법 모두 폼의 submit 이벤트를 트리거합니다. 이벤트 핸들러에선 데이터를 체크하는데, 데이터에 에러가 있는 경우 에러를 출력한 다음 event.preventDefault()를 호출하곤 합니다. 이렇게 되면 폼은 서버에 전송되지 않습니다.

form.submit()을 호출하면 자바스크립트로 직접 폼을 서버에 전송할 수 있습니다.

form.submit() 메서드가 호출된 다음엔 submit 이벤트는 생성되지 않습니다. 개발자가 form.submit()을 호출했다면 스크립트에서 이미 필요한 모든 조치를 했다고 가정하기 때문입니다.

이런 submit 메서드의 특징은 다음과 같이 폼을 직접 만들고 전송하길 원할 때 응용할 수 있습니다.
*/