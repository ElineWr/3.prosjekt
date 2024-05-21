
// ------------Delkapitlene sine bakrunnsfarger-------------- 

const delkapittel_farger = ["#60cde4", "#37946e", "#8f553b", "#ac3b3c", "#eec29a", "#8cbb94"] 
let forige_farge = "#8cbb94"
let farge_tall = 1
let i = 0

let visPoeng = document.getElementById("visPoeng")
let mus = document.getElementById("mus")
let poeng = 0

let visPoeng_2 = document.getElementById("visPoeng_2")
let mus_2 = document.getElementById("mus_2")
let poeng_2 = 0
let musebinge_bredde = 300
let musebinge_høyde = 150



// ---- navbar som bytter farge ----
const navbar = document.querySelector("#i_elementene")
window.addEventListener("scroll", function() {
    if (window.scrollY > 700) {
        navbar.style.backgroundColor = "transparent"
        navbar.style.borderColor = "transparent"
    } else {
        navbar.style.backgroundColor = "#70a88b"
        navbar.style.borderColor = "#43755b"
    }
})



// ------------Delkapitlene sine bakrunnsfarger-------------- 

/**var LightenColor = function(color, percent) {
    var num = parseInt(color,16),
      amt = Math.round(2.55 * percent),
      R = (num >> 16) + amt,
      B = (num >> 8 & 0x00FF) + amt,
      G = (num & 0x0000FF) + amt;

      return (0x1000000 + (R<255?R<1?0:R:255)*0x10000 + (B<255?B<1?0:B:255)*0x100 + (G<255?G<1?0:G:255)).toString(16).slice(1);
};**/

function LightenDarkenColor(col, amt) {
    let num = parseInt(col, 16);
    let r = (num >> 16) + amt;
    let b = ((num >> 8) & 0x00FF) + amt;
    let g = (num & 0x0000FF) + amt;
    let newColor = g | (b << 8) | (r << 16);
    return newColor.toString(16);
  }


  let firkant = document.getElementById("firkant")
  let bredde = 0
  let hoyde = 0 
  function bliStor() { 
     firkant.style.width = bredde + "px" 
      firkant.style.height = hoyde + "px" 
      bredde += 1
      hoyde += 1
      if(bredde <= 200) { 
          requestAnimationFrame(bliStor)
      }
  } 
  bliStor()


while (i<=25) {
    let random_farge = delkapittel_farger[Math.floor(Math.random() * delkapittel_farger.length)];
    let border_color1 = random_farge.split("#").pop()
    let border_farge = LightenDarkenColor(border_color1,-20)

    if ( random_farge !== forige_farge) {
        let deloverskrifter = document.getElementById("deloverskrifter_" + farge_tall)
        deloverskrifter.style.backgroundColor = random_farge
        deloverskrifter.style.borderColor = "#"+ border_farge

        deloverskrifter.style.height = "fit-content"
        
        
        farge_tall++
        i++
        forige_farge = random_farge
    }   
}




function burger_meny() {
    let hamburger = document.getElementById("hamburger");
    if (hamburger.style.display === "block") {
        hamburger.style.display = "none";
    } else {
      hamburger.style.display = "block";
    }
  }

// ---------Kode 2 eksemplene-----------

// Musen

function merPoeng(){
    poeng += 10
    console.log(poeng)
    visPoeng.innerHTML = poeng + " poeng"
}


function flyttMeg() {
    let xpos = Math.random()*(musebinge_bredde - 100)
    let ypos = Math.random()*(musebinge_høyde - 100)
    mus_2.style.left = xpos + "px"
    mus_2.style.top = ypos + "px"
    poeng_2 += 10
    visPoeng_2.innerHTML = poeng_2 + " poeng"
}





























