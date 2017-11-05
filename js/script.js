// event listener to respond to "Show another quote" button clicks
// when user clicks anywhere on the button, the "printQuote" function is called
document.getElementById('loadQuote').addEventListener("click", printQuote, false);

// Get documents vars
var quoteBox = document.getElementById('quote-box');

// The were not required
// var quote = document.getElementsByClassName('quote');
// var source = document.getElementsByClassName('source');
// var cite = document.getElementsByClassName('citation');
// var year = document.getElementsByClassName('year');

// set th
var currentQuote;
// create an empty object and assign it to returnQuote;
var returnQuote = {};

// Quotes array section
var quotes = [{
  quote: 'Give me six hours to chop down a tree and I will spend the first four sharpening the axe',
  source: 'Abraham Lincoln',
  tag: 'inspire'
},
{
  quote: 'To lead people, walk behind them',
  source: 'Lao Tzu',
  tag: 'wisdom'
},
{
  quote: 'A delayed game is eventually good, a bad game is bad forever',
  source: 'Shigeru Miyamoto',
  year: 2001,
  tag: 'gaming'
},
{
  quote: 'I look to a day when people will not be judged by the color of their skin, but by the content of their character',
  source: 'Martin Luther King Jr.',
  tag: 'inspire'
},
{
  quote: 'The time is always right to do what is right',
  source: 'Martin Luther King Jr.',
  citation: 'Oberlin College Commencement speech',
  year: 1965,
  tag: 'inspire'
}
];

// run the printQuote function every 5 seconds using the setInterval function
var myTimer = window.setInterval(function(){
  printQuote();
}, 5000);

function printQuote() {
  let newQuote = getRandomQuote();

  // Used to check the object was passed in OK
  // console.log(newQuote);
  // console.log(newQuote.quote);

  var HTML = '<p class="quote">' + newQuote.quote + '</p>'
  // check if we have a source for the quote
  if (newQuote.source !== '') {
    // add the source to the HTML string
    HTML += '<p class="source">' + newQuote.source;
    // new check if we have the cite/year exists and they are not empty
    // then add them to the HTML string
    if (newQuote.citation && newQuote.citation !== '') {
      HTML += '<span class="citation">' + newQuote.citation + '</span>'
    }
    if (newQuote.year && newQuote.year !== '') {
      HTML += '<span class="year">' + newQuote.year + '</span>'
    }
    // close the source HTML string
    HTML += '</p>'
  }
  // update the DOM with the new HTML
  quoteBox.innerHTML = HTML;

  // update the body color using the randomColor function
  document.body.style.backgroundColor = randomColor();

  // Reset the timer to improve user experience
  // for example, if you click at 4 seconds, the quote will then change on the 5th second
  window.clearInterval(myTimer);

  // Put the timer back in place
  myTimer = window.setInterval(function(){
    printQuote();
  }, 5000);

}

// function name 'getRandomQuote', the how you'll be graded section seems to contradict itself, sometimes naming it 'randomQuote'
function getRandomQuote() {
  // get the total number of quotes in the array, this will ensure that it is future proof
  // allowing quotes to be added or removed from the quotes array without breaking the funcionality
  let quoteTotal = quotes.length;

  // Get a random number and assign it to the randomQuote variable
  let randomQuote = Math.floor(Math.random() * quoteTotal);

  // Compare the currentQuote to the randomQuote number generated
  // We want this to be unique each time, otherwise the current quote number may be 4, and the random number generated may be 4
  // if this happens, when the user click the button it will display the same quote on screen and appear to not be working
  while (currentQuote === randomQuote) {
    randomQuote = Math.floor(Math.random() * quoteTotal);
  }

  // update the currentQuote number to be equal to the generated randomQuote number
  currentQuote = randomQuote;

  // Assign it to the returnQuote variable and then return it
  returnQuote = quotes[currentQuote];
  return returnQuote;
}

// randomColor function will be used each time the button is clicked
// the randomColor sometimes looks ugly
// a cleaner but less flexible approach would be to include the color in the object
// or several predefined colors in a seperate object to still make it random
function randomColor() {
  var randomColor = '#';
  // random color return as hex value
  // snipper for generating the hex is from https://css-tricks.com/snippets/javascript/random-hex-color/
  randomColor += Math.floor(Math.random()*16777215).toString(16);
  // return the random color
  return randomColor;
}
