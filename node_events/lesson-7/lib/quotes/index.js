/*
 * Title: Basic Node app example
 * Description: Simple node application that print random quotes per second interval.
 * Author: Sajib Ahamed
 * Date: 2022-06-16
 *
 */

// Dependencies
const fs = require('fs');

// Quotes object - Module scaffolding
const quotes = {};

quotes.allQuotes = function allQuotes(){
    // Read the text file containing the quotes
    const fileContent = fs.readFileSync(`${__dirname}/quotes.txt`,'utf8');

    // Turn the string into an array
    const arrayOfQuotes = fileContent.split(/\r?\n/);

    // Return the array
    return arrayOfQuotes;
};

module.exports = quotes;