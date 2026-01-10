const {sum, product} = require("./math")


console.log("Sum:", (sum(2,3,4,5,6)));
console.log("Product:", (product(2,3,4,5,6)));

const user = {
    name : "Sudip Khatiwada",
    age : 20,
    address : {
        city : "Dhangadhi",
        State: "Sudurpaschim Province",
    },
    hobbies : ["Teaching, Coding, IT"],
}

let address = user.address;

// console.log(user.address === address);

address = {
    pincode : 10900,
    country : "Nepal",
};


console.log("Module:", module)
