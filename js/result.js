var viewAnswersBtn = document.querySelector(".viewAnswersBtn");
var textResult = document.querySelector(".textResult");
var resultQout = document.querySelector(".resultQout");
var resultTable = document.querySelector(".resultTable");
var userGrade = document.querySelector(".result");
var winnerImage = document.querySelector(".winnerImage");
var loserImage = document.querySelector(".loserImage");

winnerImage.style.display = "none";


var correctAnswer = ["b", "d", "b", "d", "c"];
localStorage.setItem("correctAnswer", JSON.stringify(correctAnswer));

// to conver the correctAnswer from storge to array to the values for copersion
var correctAnswerArray = JSON.parse(localStorage.getItem("correctAnswer"));

// To get the user grade
let counter = 0;
window.onload = function () {
// to count the correct answer and get the result
  console.log(correctAnswerArray);
  for (i = 0; i < 5; i++) {
    if (correctAnswerArray[i] === sessionStorage.getItem(`question${i + 1}`))
      counter++;
  }

// chang the style based on th result
  if (counter > 2) {
    winnerImage.style.display = "block";
    loserImage.style.display = "none";
    userGrade.innerHTML = `You pass 🥳 you have got ${counter} out of 5 `;
    textResult.style.backgroundColor = "#a8f3a8";
    textResult.style.border = " 5px solid #32cd49";
    userGrade.style.color = "#32cd49";
  } else {
    resultQout.innerHTML = "Stay positive,work hard, and enjoy the journy 💜";
    userGrade.innerHTML = `You failed 😭 you have got ${counter} out of 5 `;
    userGrade.style.color = "red";
    loserImage.style.display = "block";
    winnerImage.style.display = "none ";
    textResult.style.backgroundColor = "#f7c9c6";
    textResult.style.border = " 5px solid red";
  }
};

// to show answers ...
viewAnswersBtn.onclick = function () {
  if (viewAnswersBtn.innerHTML === "View Answers") {
    viewAnswersBtn.innerHTML = "Hide answers!";
    var questionNumber = 1;
    // creat answer div an change it's the style
    for (i = 0; i < 5; i++) {
      if (
        correctAnswerArray[i] === sessionStorage.getItem(`question${i + 1}`)
      ) {
        var answer = document.createElement("div");
        answer.setAttribute("class", "answer");
        resultTable.append(answer);
        answer.innerHTML = `Q ${questionNumber} : ${sessionStorage.getItem(
          `question${i + 1}`
        )}`;
        questionNumber++;
      } else {
        var answer = document.createElement("div");
        answer.setAttribute("class", "answer");
        resultTable.append(answer);
        answer.innerHTML = `Q ${questionNumber} : ${sessionStorage.getItem(
          `question${i + 1}`
        )}`;
        answer.style.backgroundColor = "#f8333324";
        answer.style.color = "red";
        answer.style.borderColor = "red";
        var corection = document.createElement("div");
        answer.setAttribute("class", "answer");
        answer.append(corection);
        corection.innerHTML = `the correct answer is :${correctAnswerArray[i]}`;
        questionNumber++;
      }
    }
  } else {
    viewAnswersBtn.innerHTML = "View Answers";
    resultTable.innerHTML = "";
  }
};
