"use strict";

document.querySelector("#greetFromInteractive").onclick = interactiveSayHi;

function interactiveSayHi()
{
  /* greeting is a global variable from common.js
    - is it appropriate to get changed here?
    - what happens if it was changed to something unexpected, what will happen to the code then?
  */
  greeting = "hi from web deisgn 1 and interactive.js";

  document.querySelector("#interactivegreeting").textContent = greeting;
}

// add events to the buttons
document.getElementById("randomNumberGeneratorStart").onclick = startRandomNumberGenerator;
document.getElementById("randomNumberGeneratorStop").onclick = stopRandomNumberGenerator;

/* when there is going to be more than 1 usages of timed and interval code,
    make sure to assign them to variables
*/
var randomNumberDisplayInterval;
var randomNumberGeneratorTimeout;

function startRandomNumberGenerator()
{
  /* display a random number every 1 second
      https://www.w3schools.com/jsref/met_win_setinterval.asp
  */
  randomNumberDisplayInterval = setInterval("displayRandomNumber()", 1000);
}

function stopRandomNumberGenerator()
{
  clearInterval(randomNumberDisplayInterval);
  clearTimeout(randomNumberGeneratorTimeout);
}

function displayRandomNumber()
{
    var randomNumber = getRandomNumber(20);
    // textContent if we only have to insert text
    document.getElementById("randomNumber").textContent = randomNumber;

    /* put a delay to make sure the value gets updated before we pull it
        https://www.w3schools.com/jsref/met_win_settimeout.asp
    */
    randomNumberGeneratorTimeout = setTimeout(displayPreviousNumber, 500);
}

function displayPreviousNumber()
{
    var previousNumber = document.getElementById("randomNumber").textContent;
    document.getElementById("previousNumber").textContent = previousNumber;
}

// add a events to a 2nd set of the buttons to control time events
document.getElementById("dayListHighlightStart").onclick = startRandomDayHighlighting;
document.getElementById("dayListHighlightStop").onclick = stopRandomDayHighlighting;

// declare a few more variables for timer & delays
var randomDayHighlitingInterval;
var randomDayHighlitingTimeout1;
var randomDayHighlitingTimeout2;

// keep track of the values in global variables
var styleIndex = 0;
var unstyleIndex = 0;

function startRandomDayHighlighting()
{
  randomDayHighlitingInterval = setInterval("highlightDayList1()", 1000);

}

function stopRandomDayHighlighting()
{
  clearInterval(randomDayHighlitingInterval);
  clearTimeout(randomDayHighlitingTimeout1);
  clearTimeout(randomDayHighlitingTimeout2);

  // unstyle elements that are still styled
  // in the method we pass in the .highlight which targets elements with a
  // classname highlight
  document.querySelectorAll(".highlight").forEach((listItem) =>
  {
    listItem.classList.remove("highlight");
  });
}

function highlightDayList1()
{
  // before getting the next number, hold the last style index, so it can undo the class name
  // meaning, it can unstyle the previously selected value
  unstyleIndex = styleIndex;
  document.getElementById("daylist1-day" + unstyleIndex).classList.remove("highlight");
  var resultofgetelem = "daylist1-day" +unstyleIndex;
  var rest2 = document.getElementById("daylist1-day" + unstyleIndex).classList.remove("highlight");
  // pass in the days.length-1 because we want values from 0-6
  // remember that array index starts at 0, so even though in the list shoulld be 7 values
  // they are placed in index 0 through 6
  styleIndex = getRandomNumber((days.length-1));

  // for the element id, concatenate the random number to form the full id
  document.getElementById("daylist1-day" + styleIndex).classList.add("highlight");

  randomDayHighlitingTimeout1 = setTimeout(highlightDayList2, 400);
  randomDayHighlitingTimeout2 = setTimeout(highlightDayList3, 800);
}

function highlightDayList2()
{
  document.getElementById("daylist2-day" + unstyleIndex).classList.remove("highlight");
  document.getElementById("daylist2-day" + styleIndex).classList.add("highlight");
}

function highlightDayList3()
{
  document.getElementById("daylist3-day" + unstyleIndex).classList.remove("highlight");
  document.getElementById("daylist3-day" + styleIndex).classList.add("highlight");
}

/* array - stores a collection of data. data is still in index position where the index starts at 0.
  https://www.w3schools.com/js/js_arrays.asp
*/

// array literal, declare and initialize the array with values
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
console.log(days);

// we can declare an empty array with the [].
// then, place values in a specific index location by using the [<index>] syntax
var days2 = [];
days2[0] = "Sunday";
days2[1] = "Monday";
days2[2] = "Tuesday";
days2[3] = "Wednesday";
days2[4] = "Thursday";
days2[5] = "Friday";
console.log(days2);

/* arrays have methods that makes its usage dynamic and easy to work with
  https://www.w3schools.com/js/js_array_methods.asp
*/

days2.push("Saturday");
console.log(days2);

/* if items are stored sequentially, the .length property can be relied on to 
    get an appropriate 'count'. Otherwise, .length just return the number of elements
    in the array
*/
var daysCount1Element = document.querySelector("#daysCount1");
daysCount1Element.textContent = days.length;

var daysCount2Element = document.querySelector("#daysCount2");
daysCount2Element.textContent = days2.length;

writeDayNameUsingForLoop();

function writeDayNameUsingForLoop()
{
    // new query selector
    var daysList1Element = document.querySelector("#daysList1");

    var daysCount = days.length;
    var dayStructure = "";

    /* for loop 
        https://www.w3schools.com/js/js_loop_for.asp
    */
    for (var index = 0; index < daysCount; index++)
    {
        // get the value in the specified index location using the [<index>] syntax
        var day = days[index];

        // build the html element string, notice an id assigned to the list item
        dayStructure += "<li id=daylist1-day" + index + " class=day" + index + ">" + day + "</li>";
    }

    // use the innerHTML to add markup
    daysList1Element.innerHTML = dayStructure;
}

writeDayNameUsingForEachMethod();

function writeDayNameUsingForEachMethod()
{
    // new query selector
    var daysList2Element = document.querySelector("#daysList2");

    var dayStructure = "";

    /* Arry.forEach method
        https://www.w3schools.com/jsref/jsref_foreach.asp
    */

    /* Review the Syntax and Parameters
      - notice the 3rd parameter of the function. This is optional.
        - if the code needs to use the array, then pass it in, if not, then leave it out
    */
    days2.forEach((currentValue, index, days2) => 
    {
        var day = currentValue;

        // 2) then build the string with the result
        dayStructure += "<li id=daylist2-day" + index + " class=day" + index + ">" + day + "</li>";
    });

    // use the innerHTML to add markup
    daysList2Element.innerHTML = dayStructure;
}

createDaysList3FromHTMLElements();

function createDaysList3FromHTMLElements()
{
  // https://www.w3schools.com/jsref/met_document_queryselector.asp
  // returns the first element
  var daysList3Element = document.querySelector("#daysList3");

  // https://www.w3schools.com/jsref/met_document_queryselectorall.asp
  // returns all elements
  var daysList1Elements = document.querySelectorAll("#daysList1 li");
  console.log(daysList1Elements);

  var daysCount3 = daysList1Elements.length;

  daysList1Elements.forEach((currentValue, index) => 
  {
        var dayListElement = currentValue;
        console.log(dayListElement);

        // https://www.w3schools.com/jsref/met_node_clonenode.asp
        var dayListElementClone = dayListElement.cloneNode(true);

        // update the id on the element
        dayListElementClone.id = "daylist3-day" + index;

        // https://www.w3schools.com/jsref/met_node_appendchild.asp
        daysList3Element.appendChild(dayListElementClone);
    });

  // use the textContent to add content
  document.querySelector("#daysCount3").textContent = daysCount3;
}

// declare a an array
var peopleArray = [];

// declare and instantiate and object
// https://www.w3schools.com/js/js_objects.asp
var personA =
{
  name: "personA",
  sayHello: function()
  {
    personGreet(this.name);
  },
  sayHelloAgain: function()
  {
    personGreetAgain(this.name);
  }
}

// declare and instantiate and object
var personB =
{
  name: "personB",
  sayHello: function () 
  {
    personGreet(this.name);
  },
  sayHelloAgain: function()
  {
    personGreetAgain(this.name);
  }
}

function personGreet(name)
{
  document.querySelector("#greeting").innerHTML += "hello from " + name + "<br>";
}

function personGreetAgain(name)
{
  document.querySelector("#greeting2").innerHTML += "hello from " + name + "<br>";
}

function fillPeopleArray(ulID)
{
  // add personA object to array
  peopleArray.push(personA);

  // add personB object to array
  peopleArray.push(personB);

  // instantiate an object inline and add it to the array
  peopleArray.push(
    {
      name: "personC",
      sayHello: function ()
      {
        personGreet(this.name);
      },
      sayHelloAgain: function()
      {
        personGreetAgain(this.name);
      }
    });

    peopleArray.forEach((currentValue) => 
    {
      document.querySelector(ulID).innerHTML += "<li>" + currentValue.name + "</li>";
    });
}

fillPeopleArray("#peopleList");
greetPeopleStack();

function greetPeopleStack()
{
  let loopNumber = 0;

  // condition, loop until there is nothing left in the array
  while (peopleArray.length > 0)
  {
    // count how many times the while loop ran
    loopNumber++;

    // decision / selection logic using if/elseif/else
    if (peopleArray.length == 3)
    {
      document.querySelector("#greeting").innerHTML += "There are 3 values in the array<br>";
    }
    else if (peopleArray.length == 2)
    {
      document.querySelector("#greeting").innerHTML += "There are 2 values in the array<br>";
    }
    else
    {
      document.querySelector("#greeting").innerHTML += "There is 1 value in the array<br>";
    }

    document.querySelector("#greeting").innerHTML += "loop " + loopNumber + ": people array length: " + peopleArray.length + "</br>";
    // loop through each value in the array
    peopleArray.forEach((person) => 
    {
      person.sayHello();
    });

    // after each loop, the last person on the list is removed, using the pop method
    // this is an example of LIFO - last in first out
    peopleArray.pop();
  }
}

fillPeopleArray("#peopleList2");
greetPeopleQueue();

function greetPeopleQueue()
{
  let loopNumber = 0;

  // condition, loop until there is nothing left in the array
  // there is also a do...while, you can learn about it here: https://www.w3schools.com/jsref/jsref_dowhile.asp
  while (peopleArray.length > 0)
  {
    // count how many times the while loop ran
    loopNumber++;

    // https://www.w3schools.com/js/js_switch.asp
    switch (peopleArray.length)
    {
      case 3:
        document.querySelector("#greeting2").innerHTML += "There are 3 values in the array<br>";
        break;
      case 2:
        document.querySelector("#greeting2").innerHTML += "There are 2 values in the array<br>";
        break;
      default:
        document.querySelector("#greeting2").innerHTML += "There is 1 value in the array<br>";
    }

    document.querySelector("#greeting2").innerHTML += "loop " + loopNumber + ": people array length: " + peopleArray.length + "</br>";
    // loop through each value in the array
    peopleArray.forEach((person) => 
    {
      person.sayHelloAgain();
    });

    // after each loop, the first person on the list is removed, using the shift method
    // this is an example of FIFO - last in first out
    peopleArray.shift();
  }
}

/*
  There is the concept of Parallel array...
    - This is a technique we can use when we want to store coinciding/matching data in multiple arrays,
      but in the same index. (Read about this from your book)
  Note: This shouldn't be very common now with the ability to create objects
*/

buildNumberList();

function buildNumberList()
{
    var numbers = []; //declare the array

    for (var number = 1; number <= 20; number++)
    {
        numbers.push(getRandomNumber(100)); // 
    }

    let numberElement = document.querySelector("#numbers");

    numberElement.innerHTML = "random: " + numbers + "<br><br>";

    var sorted = numbers.sort();

    // Note how these are sorted, they are sorted by character value, not number value
    numberElement.innerHTML += "sorted: " + sorted + "<br><br>";

    var sortedAscending = numbers.sort(ascending);
    numberElement.innerHTML += "ascending sort: " + sortedAscending + "<br><br>";

    var sortedDescending = numbers.sort(descending);
    numberElement.innerHTML += "descending sort: " + sortedDescending + "<br><br>";

    var sortedRevers = numbers.reverse();
    numberElement.innerHTML += "reverse: " + sortedRevers + "<br><br>";

    // get a subset of the items in the original array
    var subarray = numbers.slice(5); // start index, stop index or empty for default last index
    numberElement.innerHTML += "subset: " + subarray + "<br><br>";


    let moreNumbers = [201, 205, 210, 212];

    numberElement.innerHTML += "more Numbers: " + moreNumbers + "<br><br>";

    // add the number back
    numbers = numbers.concat(moreNumbers);
    numberElement.innerHTML += "concatenated: " + numbers + "<br><br>";
}

/* sort function
    > return
        > negative for first value
        > positive for last value
        > 0 for equal (same value)
*/
function ascending(first, second)
{
    return first - second;
    // if result value is negative, it should take the 1st number
    // if result value is positive, it should take 2nd number
    // if result is the same, takes the first number (it doesn't really matter which number it takes)
}

function descending(first, second)
{
    // notice that this is the opposite of the first function

    return second - first;
    // if result value is negative, it should take the 1st number
    // if result value is positive, it should take 2nd number
    // if result is the same, takes the first number (it doesn't really matter which number it takes)
}