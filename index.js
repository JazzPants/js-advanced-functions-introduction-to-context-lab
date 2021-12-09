// Your code here
//Start of main lab
let oneRecord = ["moe", "sizlak", "barkeep", 2]

//pass in oneRecord to this function to make a :"Employee record"
function createEmployeeRecord(x) {
  return {firstName: x[0],
    familyName: x[1],
    title: x[2],
    payPerHour: x[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

let twoRows = [
  ["moe", "sizlak", "barkeep", 2],
  ["bartholomew", "simpson", "scamp", 3]
]

function createEmployeeRecords(b) {
  return b.map(x => createEmployeeRecord(x)) //x is every element/array in the array of arrays given to us
}
//e.g. for each array in twoRows, i.e. "b", pass in the nested array "x" and perform "createEmployeeRecord" function
let exampleTimeRecord = createEmployeeRecord(["Byron", "Poodle", "Mascot", 3])
let exampleTimeIn = "2014-02-28 1400"
//createTimeInEvent(exampleTimeRecord, exampleTimeIn);
function createTimeInEvent(x, y) {
  let a = y.split(" ");
  let b = x.timeInEvents;
  let obj = {
  type: "TimeIn",
  date: a[0],
  hour: parseInt(a[1]) //test requires us to turn this into an integer so not just a[1]
  }
  b.push(obj);
  return x
}
//My approach -- why doesn't it go through the NPM test?
//createTimeInEvent() {
// createEmployeeRecord(x);
// let a = y.split(" ")
// x[4] = [{
//   type: "TimeIn",
//   hour: a[0],
//   date: a[1]
// }];
// return x
//}

function createTimeOutEvent(x, y) {
  let a = y.split(" ");
  let b = x.timeOutEvents;
  let obj = {
  type: "TimeOut",
  date: a[0],
  hour: parseInt(a[1])
  }
  b.push(obj);
  return x
}

function hoursWorkedOnDate(x) {
  let a = x.timeInEvents //get key value which is an array
  let b = x.timeOutEvents
  let timeIn = a[0] //get the first element in that array which is an object
  let timeOut = b[0]
  //if the dates for timeInEvents === timeOutEvents {} | extra conditional to check employee clock-in/clock-out
  let timeWorkedInHours = (timeOut.hour - timeIn.hour) / 100 //get the hour key of that object which is a number variable _ _ 0 0
  return timeWorkedInHours
}


function wagesEarnedOnDate(x) {
  let payOwed = (hoursWorkedOnDate(x)) * x.payPerHour;
  // console.log(`THIS IS A LOG: ${payOwed} on ${y}`); //logs onto npm test! y is supposed to be the date
  return payOwed
}

cRecord = createEmployeeRecord(["Julius", "Caesar", "General", 27])
updatedBpRecord = createTimeInEvent(cRecord, "0044-03-14 0900")
updatedBpRecord = createTimeOutEvent(cRecord, "0044-03-14 2100")
updatedBpRecord = createTimeInEvent(cRecord, "0044-03-15 0900")
updatedBpRecord = createTimeOutEvent(cRecord, "0044-03-15 1100")

function allWagesFor(employee) {
  //get all dates (the date keys from all objects/dates in the array) and put into an array
  let wageDates = employee.timeInEvents.map(element => 
    {
      return element.date //[YYYY--MM--DD, YYYY--MM--DD, YYYY--MM--DD] etc. 
  } //wageDates is now an array
  )
  let reducer = (previousValue, currentValue) => previousValue + currentValue
  let totalPay = wageDates.reduce(function(previousWage, date){

  },0)
  return totalPay
}
//x is array
//y is firstName

let lokiRecord = createEmployeeRecord( ["Loki", "Laufeysson-Odinsson", "HR Representative", 35])

// function findEmployeeByFirstName(x, y) {
//   return x.find(function(element) {
//     element.firstName === y
//   })
// }

// let y = x.timeInEvents
// let z = y.map(y[0].hour)
// //map(hoursWorkedOnDate)
// let dateArray = z.map(wagesEarnedOnDate(element));
// const reducer = (a, b) => a + b;
// let sum = dateArray.reduce(reducer);
// return sum






//END of main lab

//Scope pertains to the visibility of variables, and 
//context refers to the object to which a function belongs.

//Context
console.log(this) //prints Window -> shows js functions
//in this case the context is the global object which the function belongs

// let x = {
//     a: "Hello",
//     b: function(){
//         console.log(this.a)
//     }
// }
//this context is the same as x, which wraps a and b

let x = {
    y: {
    a: "Hello",
    b: function(){
        console.log(this.a)
    }
}
}

x.y.b(); //b is a function
//this is wrapped in y, so the context of this keyword, is "y"

//arrow function vs regular function is different when dealing with context

//arrow will refer to the root object "Window"

//regular will refer to the object that wraps the this keyword (e.g. the function which wraps this)
//Implicit Context
let speak = function() { return `It ain't easy being ${this.name}`}
let frog = { name: "Kermit" }
let pig = { name: "Miss Piggy" }
frog.speak = speak
pig.speak = speak
console.log(frog.speak === pig.speak) //=> true, actual function being compared

console.log(frog.speak())  //=> "It ain't easy being Kermit" speak() in the context of object frog
console.log(pig.speak())  //=> "It ain't easy being Miss Piggy" speak() in the context of object pig
console.log(frog.speak() === pig.speak()) //=> false, function with values passed in compared, the return value (a string)

function a() {
    return function b() {
        return this;
    }
}
//context is a function


console.log(a())

let asgardianBrothers = [
    {
      firstName: "Thor",
      familyName: "Odinsson"
    },
    {
      firstName: "Loki",
      familyName: "Laufeysson-Odinsson"
    }
  ]
  
  function intro(person, line) {
    return `${person.firstName} ${person.familyName} says: ${line}`
  }
  
  function introWithContext(line){
    return `${this.firstName} ${this.familyName} says: ${line}`
  }
  
  let phrase = "I like this brown drink very much, bring me another!"
  console.log(intro(asgardianBrothers[0], phrase)) //=> Thor Odinsson says: I like this brown drink very much, bring me another!
  intro(asgardianBrothers[0], phrase) === introWithContext.call(asgardianBrothers[0], phrase) //=> true -> call() function forces in asgardianBrothers[0] as the context! (replaces this with asgardianBrothers[0])
  intro(asgardianBrothers[0], phrase) === introWithContext.apply(asgardianBrothers[0], [phrase]) //=> true, receives array instead of an object
  
  let complaint = "I was falling for thirty minutes!"
  intro(asgardianBrothers[1], complaint) === introWithContext.call(asgardianBrothers[1], complaint) //=> true
  intro(asgardianBrothers[1], complaint) === introWithContext.apply(asgardianBrothers[1], [complaint]) //=> true

  const array = ['a', 'b'];
const elements = [0, 1, 2];
array.push.apply(array, elements);
console.info(array); // ["a", "b", 0, 1, 2] //console.log vs console.info?

//Topic - Bind
//lecture 1:03:15

let thorIntro = introWithContext.bind(asgardianBrothers[0]) //binds a permanent argument, which is the "Thor Odinsson" object!
//so when you call thorIntro, it always uses "Thor Odinsson" then the given phrase ->return `${this.firstName} ${this.familyName} says: ${line}`
thorIntro("Hi, Jane") //=> Thor Odinsson says: Hi, Jane
thorIntro("I love snakes") //=> Thor Odinsson says: I love snakes
console.log(thorIntro("Hello"));

//NOTE/TIP
//console.log(introWithContext("Hello")); 
//there is no first name or family name in the global object, 
//no context is applied yet (i.e.a firstName and familyName) //undefined undefined says: Hello

//
//              ~~~~~~~~~~~~~~FUNCTIONAL PROGRAMMING (FP) ~~~~~~~~~~~~~~
let obj = {
  number: 5
};

function multiplyByTwo() {
  obj.number = obj.number * 2;
}

function addByFive() {
  obj.number = obj.number + 5;
}

addByFive();
multiplyByTwo();

console.log(obj.number);
//non-functional programming, not a pure function, because the output changes with the same input!
//non functional functions: states are shared (the variable obj is shared)



//composing a function, functions add their outputs on top of each other, but this isn't functional
// const toSlug = input => encodeURIComponent (
//   input.split(' ')
//   .map(str => str.LowerCase())
//   .join('-')
// )

//functional approach:
const toSlug = input => encodeURIComponent (
  join('-')(
    map(toLowerCase)(
      split(' ')( 
        input
      )
    )
  )
)
//split array with spaces first, then, make array lowercase, then join by dash
//split first innermost function, then map second innermost function, then join function
//final output is a string, with array strings connected by a dash


// the two functions work the same way, but this is a more functional compositional way, using the arguments


//Avoid mutations of shared states. Use immutable methods (methods which DON't mutate the original variables)
//taken from https://medium.com/javascript-scene/master-the-javascript-interview-what-is-functional-programming-7f218c68b3a0
//Example: non-mutating/non-destrutive
// const x = {
//   val: 2
// };

// const x1 = x => Object.assign({}, x, { val: x.val + 1});

// const x2 = x => Object.assign({}, x, { val: x.val * 2});

// console.log(x1(x2(x)).val); // 5


// const y = {
//   val: 2
// };

// Since there are no dependencies on outside variables,
// we don't need different functions to operate on different
// variables.

// this space intentionally left blank


// Because the functions don't mutate, you can call these
// functions as many times as you want, in any order, 
// without changing the result of other function calls.
// x2(y);
// x1(y);

// console.log(x1(x2(y)).val); // 5

//Avoiding side effects 1:26:45 in lecture
//make sure the function doesn't ever AFFECT anything outside the scope 
//(which might be shared with another function!!) of the function, otherwise bugs might be created

//Declarative vs. Imperative
//Declarative use map - specify the return you want
//Imperative use for/if loop