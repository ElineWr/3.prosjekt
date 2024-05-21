const loadingElement = document.querySelector("#load_bilde img")
const frameWidh = 1400
const frameHeight = 750
let sec = 0
let hvilket_bilde = 1

document.getElementById("se_ikkese").style.display = "none"

let loading = {
    width: 200,
    x: 0,
    x_velocity: 3,

    height: 100,
    y: 0,
    y_velocity: 3,
}


counter()
let load_lengde = setInterval(counter, 10)

let bilde = document.querySelector("#load_bilde img")
function counter() {
    sec++;

    //console.log(sec)
    if (sec == 2 ||
        sec == 4 || 
        sec == 7 || 
        sec == 10 ||
        sec == 12 ||
        sec == 13 ||
        sec == 15 ||
        sec == 18 ||
        sec == 20) {
        bilde.src = "Bilder/"+hvilket_bilde+"_Loading.jpeg";
        hvilket_bilde++
        console.log(hvilket_bilde)
    } 
    if (sec >=20 && sec <22) {
        bilde.src = "Bilder/"+hvilket_bilde+"_Loading.png"
    }
    if (sec == 22 || sec == 24 || sec == 26) {
        bilde.src = "Bilder/"+hvilket_bilde+"_Loading.png"
        
        console.log(hvilket_bilde)
        hvilket_bilde++
        
    }
    if (sec > 26)  {
    clearInterval(load_lengde)
    document.getElementById("load_bilde").style.display = "none"
    document.getElementById("se_ikkese").style.display = "block"
    document.querySelector("body").style.backgroundSize = "cover"}
}

function flyttload() {
    loading.x += loading.x_velocity
    loading.y += loading.y_velocity
    loadingElement.style.left = loading.x + "px"
    loadingElement.style.bottom = loading.y + "px"

    if (loading.x > frameWidh - loading.width || loading.x < 0) {
        loading.x_velocity = -loading.x_velocity
    }
    if (loading.y > frameHeight - loading.height || loading.y < 0) {  
        loading.y_velocity = -loading.y_velocity
        
    }
    requestAnimationFrame(flyttload, 20)
}

flyttload()

