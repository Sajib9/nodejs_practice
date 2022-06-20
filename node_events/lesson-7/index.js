/*
 * Title: Basic Node app example
 * Description: Simple node application that print random quotes per second interval.
 * Author: Sajib Ahamed
 * Date: 2022-06-16
 *
 */

// Dependencies
const mathLibrary = require('./lib/math');
const quotesLibrary = require('./lib/quotes');//automatically invoke index.js file

// App object - Module scaffolding
const app = {};

// Configuration 2sec
app.config = {
    timeBetweenQuotes : 1000,
};

// Function that prints a random quote
app.printQuote = function printQuote(){
    //get all quotes
    const allQuotes = quotesLibrary.allQuotes();

    //get length of quote array
    const numberOfQuotes = allQuotes.length;

    // Pick a random number between 1 and the number of quotes
    const randomNumber = mathLibrary.getRandomNumber(1,numberOfQuotes);

    // Get the quote at that position in the array (minus one)
    const selectedQuote = allQuotes[randomNumber-1];

    console.log(selectedQuote);

};

// Function that loops indefinitely, calling the printAQuote function as it goes
app.indefinteLoop = function indefinteLoop(){
    setInterval(app.printQuote,app.config.timeBetweenQuotes);
};

// Invoke the loo
app.indefinteLoop();