// rounding numbers function
function round(n, k){
    var factor = Math.pow(10, k);
    return Math.round(n*factor)/factor;
}
