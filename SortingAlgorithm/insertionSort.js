const givenArr = [3, 4, 1, 2, 6, 9];
const givenArr2 = [99, 6, 8, 3, 54, 27, 37, 14, 88, 41, 83, 1, -42, -99, 11];

function insertionSort(arr) {
    let tempArr = [...arr];
    let checkedArr = new Array(tempArr.length);
    checkedArr.fill(false);

    for (let t in tempArr) {
        // console.log(`this is checked array : ${checkedArr}`);
        // console.log(`this is result array : ${tempArr}`);
        if (Number(t) === 0) {
            checkedArr[t] = true;
            continue;
        }

        let tempVar = 0;
        for (let i = t; i >= 0; i--) {
            if(tempArr[i] < tempArr[i-1]) {
                let tempA = tempArr[i];
                let tempB = tempArr[i-1];
                tempArr[i-1] = tempA;
                tempArr[i] = tempB;
            }

            checkedArr[i] = true;
        }
    }

    console.log(tempArr);
    return tempArr;
}

insertionSort(givenArr);
insertionSort(givenArr2);