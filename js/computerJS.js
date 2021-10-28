
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");

let counter = 1; // declaring and intial the counter for question. 
const userAnswersArr = [];// declaring two Arrays for user answers and the correct answers. 
const correctAnswersArr = []
const nextBtn = document.querySelector('.next-btn'); // select next button element 
const wrongAnswer = 0;

// now we want to creat the function to generate the questions from engExam json
const generateQuestion = function (question) {
    const container = document.querySelector('.questions-section .row');//select container element
    const textQues = document.querySelector('.divNext .textQues');//select text of the num of Q to change 
    container.innerHTML = ""; // To fill the Question in this container 
    const markup = ` 
    <div class="question d-flex">
        <h2 class="question fontSize">${question.question}</h2> 
    </div>
    <div class="answers-section">
        <div class="form-check fontSize">
            <input class="form-check-input " type="radio" name="flexRadioDefault" data-answer="a" id="answer-1">
            <label for="answer-1">
                ${question.a}
            </label>
        </div>
        <div class="form-check fontSize">
            <input class="form-check-input" type="radio" name="flexRadioDefault" data-answer="b" id="answer-2">
            <label for="answer-2">
                ${question.b}
            </label>
        </div>
        <div class="form-check fontSize">
            <input class="form-check-input" type="radio" name="flexRadioDefault" data-answer="c" id="answer-3">
            <label for="answer-3">
                ${question.c}
            </label>
        </div>
        <div class="form-check fontSize">
            <input class="form-check-input" type="radio" name="flexRadioDefault" data-answer="d" id="answer-4">
            <label for="answer-4">
                ${question.d}
            </label>
        </div>
    </div>
    
`


    if (counter === 5) {
        nextBtn.value = "Submit";
        nextBtn.style.background = "green";
    }// change the name of next button after last Q 
    container.insertAdjacentHTML('afterbegin', markup);// active the markup 
    textQues.innerHTML = (`${counter} of 5 Questions`);// change the num of Q at single time 
    counter++;
}

// now we want to generate the fetch Function to fetch Question from JSON File 
var quizName=sessionStorage.getItem("quizName");
var htr=quizName.charAt(0).toUpperCase()+quizName.slice(1);
document.getElementById('quizId').innerHTML=`${htr} Quiz`
console.log(quizName);
const fetchQuestion = function () {
    fetch('../js/computerExam.json').then(res => res.json())
        .then(questions => {
            if (counter > 5) return
            const question = questions[quizName]['question'+counter];
            generateQuestion(question);
            nextBtn.style.display = "inline-block";
            console.log(question);
        })
       

}

//this Function to compare the answers 
const compareAnswers = function () {
   
            window.location.href = "../pages/result.html";
            

}
fetchQuestion();
startTimer(300); //calling startTimer function
startTimerLine(0); //calling startTimerLine function
nextBtn.style.display = "none";
nextBtn.addEventListener('click', function () {
    if (counter === 6) compareAnswers(); // when finish the exam 
    const inputs = document.querySelectorAll('.form-check-input');
    inputs.forEach(input => {
        if (input.checked) {
            const userAnswer = input.dataset.answer;
            sessionStorage.setItem(`question${counter - 1}`, userAnswer);
            fetchQuestion();
        }
    })
})

function startTimer(time) {
    counter = setInterval(timer, 1000);
    function timer() {
        timeCount.textContent = Math.floor(time / 60) + (":") + (time % 60); //changing the value of timeCount with time value
        time--; //decrement the time value
        if (time < 9) { //if timer is less than 9
            let addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero; //add a 0 before time value
        }
        if (time === 0) { //if timer is less than 0

            timeCount.innerHTML = "0";
            timeText.textContent = "Time Off"; //change the time text to time off
            compareAnswers();
        }
    }
}

function startTimerLine(time) {
    counterLine = setInterval(timer, 190);
    function timer() {
        time += 1; //upgrading time value with 1
        time_line.style.width = time + "px"; //increasing width of time_line with px by time value
        if (time > 7575) { //if time value is greater than 549
            clearInterval(counterLine); //clear counterLine
        }
    }
}




