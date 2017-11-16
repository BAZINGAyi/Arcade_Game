function max(number1 , number2) {
    if (parseInt(number1) > parseInt(number2)) {
        return number1;
    }else {
        return number2;
    }
}

function min(number1 , number2) {
    if (parseInt(number1) < parseInt(number2)) {
        return number1;
    }else {
        return number2;
    }
}

function randomNum(minNum,maxNum){
    switch(arguments.length){
        case 1:
            return parseInt(Math.random()*minNum+1,10);
        break;
        case 2:
            return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10);
        break;
        default:
            return 0;
        break;
    }
}