const startButton = document.getElementById("start-btn")
const nextButton = document.getElementById("next-btn")
const questionConteinerElement = document.getElementById("question-container")
const questionElement = document.getElementById("question")
const answerButtonselement = document.getElementById("answer-buttons")

let stokkaOm, currentQuestionindex

const questions = [
    {
        question: 'Hvilken metode brukes vanligvis for å kontinuerlig oppdatere spilltilstanden og gjengi spillet i JavaScript?',
        answers: [
            {text: "setTimeout()", correct: false },
            {text: "setInterval()", correct: false },
            {text: "requestAnimationFrame()", correct: true },
            {text: "clearInterval()", correct: false },
        ]
    },
    {
        question: 'Hva er hovedformålet med Canvas i HTML for spillutvikling',
        answers: [
            {text: "For å lagre spilldata", correct: false },
            {text: "For å gjengi grafikk", correct: true },
            {text: "For å administrere spilltilstander", correct: false },
            {text: "For å håndtere brukerinnspill", correct: false },
        ]
    },
    {
        question: 'Hva representerer ctx-variabelen vanligvis i et Canvas-basert spill?',
        answers: [
            {text: "Hovedspillsløyfen", correct: false },
            {text: "Spillresultatet", correct: false },
            {text: "2D-gjengivelseskonteksten", correct: true },
            {text: "Spillerkarakteren", correct: false },
        ]
    },
    {
        question: 'Hvilken JavaScript-hendelse er best for å oppdage når en tast trykkes?',
        answers: [
            {text: "onclick", correct: false },
            {text: "onkeydown", correct: true },
            {text: "onkeypress", correct: false },
            {text: "onkeyup", correct: false },
        ]
    },
    {
        question: 'Hvilken metode brukes for å tømme Canvas før du tegner spillrammen på nytt?',
        answers: [
            {text: "ctx.clear()", correct: false },
            {text: "ctx.clearRect()", correct: true },
            {text: "ctx.reset()", correct: false },
            {text: "ctx.erase()", correct: false },
        ]
    },
    {
        question: 'Hva er rollen til kollisjonsdeteksjon i et spill?',
        answers: [
            {text: "For å forbedre grafikken", correct: false },
            {text: "For å spille bakgrunnsmusikk", correct: false },
            {text: "For å laste inn spillressurser", correct: false },
            {text: "For å oppdage når spillobjekter samhandler", correct: true }
        ]
    },
    {
        question: 'Hvilken funksjon brukes vanligvis til å generere et tilfeldig tall i JavaScript for spillmekanikk?',
        answers: [
            {text: "Math.random()", correct: true },
            {text: "Math.randomInt()", correct: false },
            {text: "Math.rand()", correct: false },
            {text: "Math.randomNumber()", correct: false },
        ]
    },
    {
        question: 'In JavaScript, which function is used to repeatedly call a function with a fixed time delay?',
        answers: [
            {text: "setInterval()", correct: true },
            {text: "setTimeout()", correct: false },
            {text: "requestAnimationFrame()", correct: false },
            {text: "clearTimeout()", correct: false },
        ]
    },
    {
        question: 'Hva er en "event listener" i sammenheng med JavaScript-spillutvikling?',
        answers: [
            {text: "En funksjon som lytter etter spilllyd", correct: false },
            {text: "En loop som gjengir frames", correct: false },
            {text: "En funksjon som reagerer på brukerinnspill eller andre hendelser", correct: true },
            {text: "En metode for å tegne former", correct: false },
        ]
    }
]

startButton.addEventListener("click", startGame)
nextButton.addEventListener("click", () => {
    currentQuestionindex+=1
    setNextQuestion()
})

function startGame() {
    console.log("Quiz started")
    startButton.classList.add("hide")
    //stokkaOm = questions.sort(() => Math.random()-0,5)
    //console.log(stokkaOm)
    currentQuestionindex = 0
    questionConteinerElement.classList.remove("hide")
   setNextQuestion()

   if(startButton.innerText == "Hjem") {
    console.log("Drar hjem")
    visitPage()
}
}

function visitPage() {
    window.location='file:///Users/elinewrangell/Desktop/Skole/VGS%202/IT/3.prosjekt/index.html';
 }

function setNextQuestion() {
    resetState()
    showquestion(questions[currentQuestionindex])

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
    clearStatusClass()
    nextButton.classList.add("hide")
    while(answerButtonselement.firstChild) {
        answerButtonselement.removeChild(answerButtonselement.firstChild)
    }
}

function clearStatusClass() {
    document.body.classList.remove("wrong")
    document.body.classList.remove("correct")
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonselement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    console.log(questions.length)
    nextButton.classList.remove("hide")
    
    startButton.innerText = "Hjem"
    startButton.classList.remove("hide")

    
    
}

function setStatusClass(element, correct) {
    clearStatusClass()
    if(correct) {
        element.classList.add("correct")
    } else {
        element.classList.add("wrong")
    }
}





