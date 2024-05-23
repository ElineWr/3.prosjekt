const startButton = document.getElementById("start-btn")
const nextButton = document.getElementById("next-btn")
const questionConteinerElement = document.getElementById("question-container")
const questionElement = document.getElementById("question")
const answerButtonselement = document.getElementById("answer-buttons")

let stokkaOm, currentQuestionindex

const questions = [
    {
        question: 'What is 1+1',
        answers: [
            {text: "2", correct: true },
            {text: "3", correct: false },
            {text: "5", correct: false },
            {text: "6", correct: false },
        ]
    },
    {
        question: 'What is 1+1',
        answers: [
            {text: "2", correct: true },
            {text: "3", correct: false },
            {text: "5", correct: false },
            {text: "6", correct: false },
        ]
    },
    {
        question: 'What is 1+1',
        answers: [
            {text: "2", correct: true },
            {text: "3", correct: false },
            {text: "5", correct: false },
            {text: "6", correct: false },
        ]
    },
    {
        question: 'What is 1+1',
        answers: [
            {text: "2", correct: true },
            {text: "3", correct: false },
            {text: "5", correct: false },
            {text: "6", correct: false },
        ]
    },
    {
        question: 'What is 1+1',
        answers: [
            {text: "2", correct: true },
            {text: "3", correct: false },
            {text: "5", correct: false },
            {text: "6", correct: false },
        ]
    },
    {
        question: 'What is 1+1',
        answers: [
            {text: "2", correct: true },
            {text: "3", correct: false },
            {text: "5", correct: false },
            {text: "6", correct: false },
        ]
    },
    {
        question: 'What is 1+1',
        answers: [
            {text: "2", correct: true },
            {text: "3", correct: false },
            {text: "5", correct: false },
            {text: "6", correct: false },
        ]
    },
    {
        question: 'What is 1+1',
        answers: [
            {text: "2", correct: true },
            {text: "3", correct: false },
            {text: "5", correct: false },
            {text: "6", correct: false },
        ]
    },
    {
        question: 'What is 1+1',
        answers: [
            {text: "2", correct: true },
            {text: "3", correct: false },
            {text: "5", correct: false },
            {text: "6", correct: false },
        ]
    }
]

startButton.addEventListener("click", startGame)
nextButton.addEventListener("click", () => {
    currentQuestionindex++
    setNextQuestion()
})

function startGame() {
    console.log("Quiz started")
    startButton.classList.add("hide")
    stokkaOm = questions.sort(() => Math.random()-0,5)
    currentQuestionindex = 0
    questionConteinerElement.classList.remove("hide")
    setNextQuestion()
}

function setNextQuestion() {
    resetState()
    showquestion(stokkaOm[currentQuestionindex])

}

function showquestion(question) {
    questionElement.innerHTML = question.question
    question.answers.forEach(answer => {
        const button = document.createElement("button")
        button.innerHTML = answer.text
        button.classList.add("btn")
        if(answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer)
        answerButtonselement.appendChild(button)
    });
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add("hide")
    while(answerButtonselement.firstChild) {
        answerButtonselement.removeChild(answerButtonselement.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonselement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if(stokkaOm.lenght > currentQuestionindex + 1) {
        nextButton.classList.remove("hide")
    } else {
        startButton.innerText = "På nytt?"
        startButton.classList.remove("hide")
    }
    
}

function setStatusClass(element, correct) {
    clearStatusClass()
    if(correct) {
        element.classList.add("correct")
    } else {
        element.classList.add("wrong")
    }
}

function clearStatusClass(element) {
    element.classList.remove("correct")
    element.classList.remove("wrong")
}



