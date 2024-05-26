// Min Canvas 1 

let minCanvas = document.getElementById("minCanvas")
let ctx = minCanvas.getContext("2d")

let firkant_bevege = {
    "bredde": 20,
    "hoyde": 20,
    "farge": "DarkGreen", 
    "xpos": 180, 
    "ypos": 40, 
    "xfart": 1.5, 
    "xretning": 1, 
}

function tegnFirkant() {
    ctx.fillStyle = "aliceblue"
    ctx.fillRect(0,0,400,100)
    ctx.fillStyle = "Green"
    ctx.fillRect(firkant_bevege.xpos, firkant_bevege.ypos, firkant_bevege.bredde, firkant_bevege.hoyde)
    firkant_bevege.xpos = firkant_bevege.xpos + (firkant_bevege.xretning * firkant_bevege.xfart)
    if(firkant_bevege.xpos <= 0) {
        firkant_bevege.xretning = 1
    }
    if(firkant_bevege.xpos + firkant_bevege.bredde >= minCanvas.width) {
        firkant_bevege.xretning = -1 
    }
    requestAnimationFrame(tegnFirkant) 
}
tegnFirkant()

document.onkeydown = function(evt) {
    let kode = evt.key
    if(kode === "ArrowRight") {
        firkant_bevege.xretning = 1
    }
    if(kode === "ArrowLeft") {
        firkant_bevege.xretning = -1
    }
    if(kode === "w" ||kode === "W" ) {
        racket.yretning = -1
    }
    if(kode === "s" || kode === "S") {
        racket.yretning = 1
    }
}


// Min Canvas 2

let minTennisCanvas = document.getElementById("minCanvas_2");
let ctx_2 = minTennisCanvas.getContext("2d");
let theGameOn = true;

let hdnPoeng = document.getElementById("hdnPoeng");
let hdnRecord = document.getElementById("hdnRecord");
let tennisPoeng = 0;

let tennisRecord = localStorage.getItem("tennisRecord") || 0;
hdnRecord.innerHTML = "Rekord: " + tennisRecord;

let bane = {
    bredde: minTennisCanvas.width,
    hoyde: minTennisCanvas.height,
    gressfarge: "#7fc980",
    linjefarge: "white",
    linjetykkelse: 4
};

let ball = {
    radius: 7,
    xpos: 100,
    ypos: 100,
    farge: "yellow",
    xretning: -1,
    yretning: 1,
    xfart: 4,
    yfart: 4
};

let racket = {
    bredde: 10,
    hoyde: 50,
    farge: "White",
    xpos: bane.bredde - 15,
    ypos: bane.hoyde / 2,
    yretning: 0,
    yfart: 3
};

function tegnBane() {
    ctx_2.fillStyle = bane.gressfarge;
    ctx_2.fillRect(0, 0, bane.bredde, bane.hoyde);
    ctx_2.fillStyle = bane.linjefarge;
    ctx_2.fillRect(bane.bredde / 2 - bane.linjetykkelse / 2, 0, bane.linjetykkelse, bane.hoyde);
}

function tegnBall() {
    ctx_2.beginPath();
    ctx_2.arc(ball.xpos, ball.ypos, ball.radius, 0, Math.PI * 2);
    ctx_2.closePath();
    ctx_2.fillStyle = ball.farge;
    ctx_2.fill();
    ball.xpos = ball.xpos + ball.xfart * ball.xretning;
    ball.ypos = ball.ypos + ball.yfart * ball.yretning;
}

function tegnRacket() {
    ctx_2.fillStyle = racket.farge;
    ctx_2.fillRect(racket.xpos, racket.ypos, racket.bredde, racket.hoyde);
    if (racket.ypos <= 0 && racket.yretning === -1) {
        return;
    }
    if (racket.ypos + racket.hoyde >= bane.hoyde && racket.yretning === 1) {
        return;
    }
    racket.ypos = racket.ypos + (racket.yfart * racket.yretning);
}

function merTilfeldig() {
    let vinkel = (Math.random() - 0.5) * Math.PI / 8; // teeny weeny vinkel foranding
    let cosvinkel = Math.cos(vinkel);
    let sinvinkel = Math.sin(vinkel);

    let nyXRetning = ball.xretning * cosvinkel - ball.yretning * sinvinkel;
    let nyYRetning = ball.xretning * sinvinkel + ball.yretning * cosvinkel;

    // ikke miste speed-mobil
    let length = Math.sqrt(nyXRetning * nyXRetning + nyYRetning * nyYRetning);
    ball.xretning = nyXRetning / length;
    ball.yretning = nyYRetning / length;
}

function sjekkOmBallTrefferVegg() {
    if (ball.xpos <= ball.radius || ball.xpos + ball.radius >= bane.bredde) {
        ball.xretning = -ball.xretning;
        merTilfeldig();
    }
    if (ball.ypos <= ball.radius || ball.ypos + ball.radius >= bane.hoyde) {
        ball.yretning = -ball.yretning;
        merTilfeldig();
    }
}

function sjekkOmBallTrefferRacket() {
    let ballenErTilVenstre = ball.xpos + ball.radius < racket.xpos;
    let ballenErTilHoyre = ball.xpos - ball.radius > racket.xpos + racket.bredde;
    let ballenErOver = ball.ypos + ball.radius < racket.ypos;
    let ballenErUnder = ball.ypos - ball.radius > racket.ypos + racket.hoyde;
    if (!ballenErTilVenstre && !ballenErTilHoyre && !ballenErOver && !ballenErUnder) {
        ball.xretning = -ball.xretning;
        // anti stuckmobilen
        ball.xpos = racket.xpos - ball.radius;
        merTilfeldig();

        tennisPoeng = tennisPoeng + 1;
        hdnPoeng.innerHTML = "Poeng: " + tennisPoeng;

        if (tennisPoeng > tennisRecord) {
            tennisRecord = tennisPoeng;
            localStorage.setItem("tennisRecord", tennisRecord);
            hdnRecord.innerHTML = "Ny rekord: " + tennisRecord;
            hdnRecord.style.color = "purple";
        }
    }
}

function sjekkOmBallErUtenforBanen() {
    if (ball.xpos > bane.bredde + ball.radius * 2) {
        theGameOn = false;
    }
}

function gameLoop() {
    ctx_2.clearRect(0, 0, bane.bredde, bane.hoyde); // Clear  canvas
    tegnBane();
    tegnBall();
    tegnRacket();
    sjekkOmBallTrefferVegg();
    sjekkOmBallTrefferRacket();
    sjekkOmBallErUtenforBanen();
    if (theGameOn) {
        requestAnimationFrame(gameLoop);
    }
}

gameLoop();


// Nedenfor er versjonen av koden som er ber direkte fra boka
// denne bytter aldri vinkel så du kan basicly bare la racketen stå og bare så masse poeng. 
// Jeg likte ikke dette så jeg forandra litt på det.

/*
let minTennisCanvas = document.getElementById("minCanvas_2");
let ctx_2 = minTennisCanvas.getContext("2d");
let theGameOn = true;

let hdnPoeng = document.getElementById("hdnPoeng");
let hdnRecord = document.getElementById("hdnRecord");
let tennisPoeng = 0;

let tennisRecord = localStorage.getItem("tennisRecord") || 0;
hdnRecord.innerHTML = "Rekord: " + tennisRecord;

let bane = {
    bredde: minTennisCanvas.width,
    hoyde: minTennisCanvas.height,
    gressfarge: "#7fc980",
    linjefarge: "white",
    linjetykkelse: 4
};

let ball = {
    radius: 7,
    xpos: 100,
    ypos: 100,
    farge: "yellow",
    xretning: -1,
    yretning: 1,
    xfart: 4,
    yfart: 4
};

let racket = {
    bredde: 10,
    hoyde: 50,
    farge: "White",
    xpos: bane.bredde - 15,
    ypos: bane.hoyde / 2,
    yretning: 0,
    yfart: 5
};

function tegnBane() {
    ctx_2.fillStyle = bane.gressfarge;
    ctx_2.fillRect(0, 0, bane.bredde, bane.hoyde);
    ctx_2.fillStyle = bane.linjefarge;
    ctx_2.fillRect(bane.bredde / 2 - bane.linjetykkelse / 2, 0, bane.linjetykkelse, bane.hoyde);
}

function tegnBall() {
    ctx_2.beginPath();
    ctx_2.arc(ball.xpos, ball.ypos, ball.radius, 0, Math.PI * 2);
    ctx_2.closePath();
    ctx_2.fillStyle = ball.farge;
    ctx_2.fill();
    ball.xpos = ball.xpos + ball.xfart * ball.xretning;
    ball.ypos = ball.ypos + ball.yfart * ball.yretning;
}

function tegnRacket() {
    ctx_2.fillStyle = racket.farge;
    ctx_2.fillRect(racket.xpos, racket.ypos, racket.bredde, racket.hoyde);
    if (racket.ypos <= 0 && racket.yretning === -1) {
        return;
    }
    if (racket.ypos + racket.hoyde >= bane.hoyde && racket.yretning === 1) {
        return;
    }
    racket.ypos = racket.ypos + (racket.yfart * racket.yretning);
}

function sjekkOmBallTrefferVegg() {
    if (ball.xpos <= ball.radius || ball.xpos + ball.radius >= bane.bredde) {
        ball.xretning = -ball.xretning;
    }
    if (ball.ypos <= ball.radius || ball.ypos + ball.radius >= bane.hoyde) {
        ball.yretning = -ball.yretning;
    }
}

function sjekkOmBallTrefferRacket() {
    let ballenErTilVenstre = ball.xpos + ball.radius < racket.xpos;
    let ballenErTilHoyre = ball.xpos - ball.radius > racket.xpos + racket.bredde;
    let ballenErOver = ball.ypos + ball.radius < racket.ypos;
    let ballenErUnder = ball.ypos - ball.radius > racket.ypos + racket.hoyde;
    if (!ballenErTilVenstre && !ballenErTilHoyre && !ballenErOver && !ballenErUnder) {
        ball.xretning = -ball.xretning;
        tennisPoeng = tennisPoeng + 1;
        hdnPoeng.innerHTML = "Poeng: " + tennisPoeng;

        if (tennisPoeng > tennisRecord) {
            tennisRecord = tennisPoeng;
            localStorage.setItem("tennisRecord", tennisRecord);
            hdnRecord.innerHTML = "Ny rekord: " + tennisRecord;
            hdnRecord.style.color = "purple";
        }
    }
}

function sjekkOmBallErUtenforBanen() {
    if (ball.xpos > bane.bredde + ball.radius * 2) {
        theGameOn = false;
    }
}

function gameLoop() {
    ctx_2.clearRect(0, 0, bane.bredde, bane.hoyde); // Clear canvas
    tegnBane();
    tegnBall();
    tegnRacket();
    sjekkOmBallTrefferVegg();
    sjekkOmBallTrefferRacket();
    sjekkOmBallErUtenforBanen();
    if (theGameOn) {
        requestAnimationFrame(gameLoop);
    }
}

gameLoop(); */

