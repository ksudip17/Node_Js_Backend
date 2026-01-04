function sum (...nums) {
    return nums.reduce((acc, curr) => acc + curr);
}


 function product (...nums) {
    return nums.reduce((acc, curr) => acc * curr);
}


module.exports = {
    sum, 
    product,
};
