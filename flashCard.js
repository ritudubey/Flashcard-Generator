
// In this week's assignment, you will create the backend for a basic flashcard application.

// The backend will essentially constitute an API that allows users to create two types of flashcards.

// 1. **Basic** flashcards, which have a front (*"Who was the first president of the United States?"*), and a 
// back (*"George Washington"*).

// 2. **Cloze-Deleted** flashcards, which present *partial* text 
// (*"... was the first president of the United States."*), 
// and the full text when the user requests it 
// (*"George Washington was the first president of the United States."*)

// As your application will not have a front end, your only need to determine an efficient way to 
// store cloze-deleted cards&mdash;you don't have to solve the problem of displaying them. 
// You are free to decide how you'd like to implement this. One might represent the above flashcard thus:

// ```
// {
//   cloze : "{{c1::George Washington}} was the first president of the United States."
// }
// ```

// ...And expecte the front-end to simply hide any part of the string wrapped in `{{c1::...}}`. 
// This works, but there are better ways to do it&mdash;try to think of one.

//Create a `BasicFlashcard` constructor. It should accept `front` and `back` arguments.
var BasicFlashcard = function(front, back) {

}

//Create a `ClozeFlashard` constructor. It should accept `text` and `cloze` arguments.
var ClozeFlashard = function(text, cloze) {
    
}

// `ClozeFlashcard` should have a method that returns *only* the cloze-deleted portion 
// of the text.
// You are free to experiment with the other details of your implementation, 
// but you must store at least one property, and equip cloze-deleted flashcards with 
// at least one additional method.
var frontQues = ["quest 1", "Quest 2", "Quest 3"];
var backAns = ["ans 1", "ans 2", "ans 3"]

var playGame = function () {
    inquirer.prompt([
        {
            type: "list",
            name: "item",
            message: "Would you like to play?",
            choices: ["BasicFlashCard", "ClozeFlashCard"]
        }
    ]).then(function (answers) {
        console.log(choices)
        if (choices = "BasicFlashCard") {
            console.log("BasicFlashCard");
            //select a random quest for user input
            inquirer.prompt([
                {
                    type: "input",
                    message: "What is answer?",
                    name: "title"
                }
            ]).then(function (answers) {
                console.data("You chose " + answers.title);

            });

        }
        else {
            console.log("ClozeFlashCard");
            inquirer.prompt([
                {
                    type: "input",
                    message: "Fill the blank?",
                    name: "title"
                }
            ]).then(function (answers) {
                console.data("You chose " + answers.title);

            });
        }
    })
}

playGame();