// Your code here

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
const toSlug = input => encodeURIComponent (
  input.split(' ')
  .map(str => str.LowerCase())
  .join('-')
)

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
const x = {
  val: 2
};

const x1 = x => Object.assign({}, x, { val: x.val + 1});

const x2 = x => Object.assign({}, x, { val: x.val * 2});

console.log(x1(x2(x)).val); // 5


const y = {
  val: 2
};

// Since there are no dependencies on outside variables,
// we don't need different functions to operate on different
// variables.

// this space intentionally left blank


// Because the functions don't mutate, you can call these
// functions as many times as you want, in any order, 
// without changing the result of other function calls.
x2(y);
x1(y);

console.log(x1(x2(y)).val); // 5

//Avoiding side effects 1:26:45 in lecture
//make sure the function doesn't ever AFFECT anything outside the scope 
//(which might be shared with another function!!) of the function, otherwise bugs might be created

//Declarative vs. Imperative
//Declarative use map - specify the return you want
//Imperative use for/if loop