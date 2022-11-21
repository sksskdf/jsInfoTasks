const { log } = console;

function solution(number, limit, power) {
    let count = 0;

    for (let i = 1; i <= number; i++) {
        if (i === 1) {
            count++;
        } else {
            let num = findDiv(i);
            count += num > limit ? power : num;
        }
    }

    return count;
}

function findDiv(number) {
    if (number === 1) {
        return 1;
    } 

    let count = 1;

    for (let i = 1; i <= number/2; i++) {
        if(i === 1) {
            count++;
            continue;
        }

        if (number % i === 0) {
            count++;
        }
    }
    
    return count;
}

log(solution(10));