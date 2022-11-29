function recursion(number) {
    let processedNumber =  number--;

    if(processedNumber > 0) {
        recursion(processedNumber);
    }
}

recursion