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

//bind lecture 1:03:15