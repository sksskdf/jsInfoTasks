const {log} = console;

const givenArr = [3, 4, 1, 5, 2];
const givenArr2 = [18, 3, 5, 15, 10, 1, -1, 2];

function selectionSort(arr) {
    let tempArr = [...arr];

    for (let i = 0; i < tempArr.length; i++) {
        let minNum = Number.MAX_VALUE;
        let minNumIndex = 0;
        for (let j = i; j < tempArr.length; j++) {
            if (tempArr[j] < minNum) {
                minNum = tempArr[j];
                minNumIndex = j;
            }
        }

        let tempA = tempArr[i];
        let tempB = tempArr[minNumIndex];
        tempArr[i] = tempB;
        tempArr[minNumIndex] = tempA;
    }
    
    log(tempArr);
}

selectionSort(givenArr);
selectionSort(givenArr2);