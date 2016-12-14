
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
var fs = require("fs");

function fileWrite(err) {
if(err) {
    return console.log(err);
}else {
    //console.log("flash.txt updated");
}
}

var BasicFlashcard = function(front, back) {
    fs.appendFile("flash.txt", "basic:" + front + "," + back, fileWrite);
}

//Create a `ClozeFlashard` constructor. It should accept `text` and `cloze` arguments.
var ClozeFlashcard = function(text) {
    fs.appendFile("flash.txt", "text:" + text, fileWrite);
}

// `ClozeFlashcard` should have a method that returns *only* the cloze-deleted portion 
// of the text.
// You are free to experiment with the other details of your implementation, 
// but you must store at least one property, and equip cloze-deleted flashcards with 
// at least one additional method.
var BasicQuesAnsArray = [
    {front : "Who named America", back : "Amerigo Vespucci"},
    {front : "Who was first president of USA", back : "George Washington"},
    {front : "When year did the American revolution end", back : "1783"}
];

var ClozeQuesAnsArray = [
    {text : "{Amerigo Vespucci} named America"},
    {text : "{George Washington} was first president of USA"},
    {text : "{1783} the American revolution ended"}
];

var inquirer = require("inquirer");

var playBasicGame = function() {
    var i = Math.floor(Math.random() * BasicQuesAnsArray.length);
    var object = BasicQuesAnsArray[i];
    console.log("Ques " + i + " :" + object.front);
    inquirer.prompt([
        {
            type: "confirm",
            message: "Flip card?",
            name: "flipCard"
        }
    ]).then(function (answer) {
        if (true === answer.flipCard) {
            console.log("Ans " + i + " :" + object.back);
            inquirer.prompt([
                {
                    type: "confirm",
                    message: "Next card?",
                    name: "nextCard"
                }
            ]).then(function (answer) {
                if (true === answer.nextCard) {
                    playBasicGame();
                } else {
                    console.log("Exit game");
                    return;
                }
            });
        } else {
            playBasicGame();
        }
    });   
}

var playClozeGame = function() {
 inquirer.prompt([
                {
                    type: "input",
                    message: "Fill the blank?",
                    name: "title"
                }
            ]).then(function (answers) {
                console.data("You chose " + answers.title);

            });
            
    var i = Math.floor(Math.random() * ClozeQuesAnsArray.length);
    var object = ClozeQuesAnsArray[i];
    //Replace with dashes
    var regExp = /\{([^)]+)\}/;
    var matches = regExp.exec(object.text);
    var newText = matches[1].substr(0, matches[1].length);
    var blanks="";
    for (var i=0; i < matches[1].length; i++){
        blanks += '-';
    }
    var newDisplay = object.text.replace(newText, blanks);
    
    console.log("Ques " + i + " :" + newDisplay);
    inquirer.prompt([
        {
            type: "name",
            message: "Fill in the blank",
            name: "fillBlank"
        }
    ]).then(function (answer) {
        if (newText === answer.fillBlank) {
            console.log("You choose correct ans!!");
              }else{
            console.log("You choose incorrect ans!!");
              }
            console.log("Ans " + i + " :" + answer.text.c1);
            inquirer.prompt([
                {
                    type: "confirm",
                    message: "Next card?",
                    name: "nextCard"
                }
            ]).then(function (res) {
                if (true === res.nextCard) {
                    console.log("Go to next card");
                    playClozeGame();
                } else {
                    console.log("Exit game");
                    return;
                }
            });
    });   
}

var playGame = function () {
 for (var i = 0; i < BasicQuesAnsArray.length; i++) {
    var object = BasicQuesAnsArray[i];
    BasicFlashcard(object.front, object.cloze);
 }

  for (var i = 0; i < ClozeQuesAnsArray.length; i++) {
    var object = ClozeQuesAnsArray[i];
    ClozeFlashcard(object.text);
 }



  inquirer.prompt([
      {
          type: "list",
          message: "Would you like to play ?",
          choices: ["BasicFlashCard", "ClozeFlashCard", "exit"],
          name: "pick"
      }
  ]).then(function (resp) {

      console.log(resp.pick);

      if (resp.pick == "BasicFlashCard") {
          console.log("Selected BasicFlashCard");
          playBasicGame();
      }
      else {
          console.log("ClozeFlashCard");
          playClozeGame();
      }
  });
}


playGame();