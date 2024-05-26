let minTennisCanvas = document.getElementById("minCanvas_2")
let ctx_2 = minTennisCanvas.getContext("2d")
let theGameOn = true

let hdnPoeng = document.getElementById("hdnPoeng")
let hdnRecord = document.getElementById("hdnRecord")
let tennisPoeng = 0
localStorage.tennisRecord = 0


let bane = {
    bredde: minTennisCanvas.width,
    hoyde: minTennisCanvas.height,
    gressfarge: "#7fc980",
    linjefarge: "white",
    linjetykkelse: 4
}

let ball = {
    radius: 7,
    xpos: 100,
    ypos: 100,
    farge: "yellow",
    xretning: -1,
    yretning: 1,
    xfart: 4,
    yfart: 4
}

let racket = {
    bredde: 10,
    hoyde: 50,
    farge: "White",
    xpos: bane.bredde - 15,
    ypos: bane.hoyde / 2,
    yretning: 0,
    yfart: 5
}

function tegnBane() {
    ctx_2.fillStyle = bane.gressfarge
    ctx_2.fillRect(0, 0, bane.bredde, bane.hoyde)
    ctx_2.fillStyle = bane.linjefarge
    ctx_2.fillRect(bane.bredde/2-bane.linjetykkelse/2, 0, bane.linjetykkelse, bane.hoyde)
}

function tegnBall() {
    ctx_2.beginPath()
    ctx_2.arc(ball.xpos, ball.ypos, ball.radius, 0, Math.PI*2)
    ctx_2.closePath()
    ctx_2.fillStyle = ball.farge
    ctx_2.fill()
    ball.xpos = ball.xpos + ball.xfart * ball.xretning
    ball.ypos = ball.ypos + ball.yfart * ball.yretning
}

function tegnRacket() {
    ctx_2.fillStyle = racket.farge
    ctx_2.fillRect(racket.xpos, racket.ypos, racket.bredde, racket.hoyde)
    if(racket.ypos <= 0 && racket.yretning === -1) {
        return
    }
    if(racket.ypos + racket.hoyde >= bane.hoyde && racket.yretning === 1) {
        return
    }
    racket.ypos = racket.ypos + (racket.yfart * racket.yretning) 
}

function sjekkOmBallTrefferVegg() {
    if(ball.xpos <= ball.radius || ball.xpos + ball.radius >= bane.bredde) {
        ball.xretning = -ball.xretning
    }
    if(ball.ypos <= ball.radius || ball.ypos + ball.radius >= bane.hoyde) {
        ball.yretning = -ball.yretning
    }
   // if(ball.yretning <= ball.radius) {
   //     ball.yretning = 1
  // }
}

function sjekkOmBallTrefferRacket() {
    let ballenErTilVenstre = ball.xpos + ball.radius < racket.ypos
    let ballenErTilHoyre = ball.xpos - ball.radius > racket.xpos + racket.bredde
    let ballenErOver = ball.ypos + ball.radius < racket.ypos
    let ballenErUnder = ball.ypos - ball.radius > racket.ypos + racket.hoyde
    if(!ballenErTilVenstre && !ballenErTilHoyre && !ballenErOver && !ballenErUnder) {
        ball.xretning = -1
        tennisPoeng += 1
        hdnPoeng.innerHTML = "Poeng: " + tennisPoeng
        if(tennisPoeng > localStorage.tennisRecord) {
            localStorage.tennisRecord = poeng
            hdnRecord.innerHTML = "Ny rekord: " + tennisPoeng
            hdnRecord.style.color = "purple"
        }
    }
}


function sjekkOmBallErUtenforBanen() {
    if(ball.xpos > bane.bredde + ball.radius*2) {
        theGameOn = false
    }
}

function gameLoop() {
    tegnBane()
    tegnBall()
    tegnRacket()
    sjekkOmBallTrefferVegg()
    sjekkOmBallTrefferRacket()
    sjekkOmBallErUtenforBanen()
    if(theGameOn) {
        requestAnimationFrame(gameLoop)
    } 
}

gameLoop()