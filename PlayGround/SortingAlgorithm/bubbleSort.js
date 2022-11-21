const givenArray = [6, 2, 1, 3, 5, 4];
const givenArray2 = [9, 2, 4, 1, 6, 7, 14, 99];

function bubbleSort(arr) {
    //make bool array for checking
    let checkedBoolArr = new Array(arr.length);
    checkedBoolArr.fill(false);

    let resultArr = [...arr];

    for (let a in resultArr){
        for(let i = resultArr.length-1; i >= 0; i--) {
            if (checkedBoolArr[i] !== true) {
                //i , i-1 compare -> i가 크면 그대로 i가 작으면 위치 바꾸기
                if (resultArr[i] < resultArr[i-1]) {
                    let tempA = resultArr[i];
                    let tempB = resultArr[i-1];
                    resultArr[i] = tempB;
                    resultArr[i-1] = tempA;
                }
            }
        }
        checkedBoolArr[a] = true;
    }

    console.log(resultArr);
    return resultArr;
}

bubbleSort(givenArray);
bubbleSort(givenArray2);