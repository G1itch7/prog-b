let player
let colors
let circles = []
let lives = 1
let globalInterval

/* to do list
Lav slowdown button
Find lyde
add level indicator
add timer
start menu
difficulty slider
*/

function setup(){
  createCanvas(windowWidth, windowHeight);

//Laver en farve mappe for mig selv
  colors = {
    c1: color("#aad8ff"),
    c2: color("#f0f0f0"),
    c3: color("#80808080"),
    c4: color("#90909090"),
    c5: color("#e0e0e0e0")
  }
//Laver musen
  player = {
    //position placeholder
    x: 0,
    y: 0,
    //størrelsen på cirkler
    d1: 30,
    d2: 22,
    //funktioner der laver cirklerne på musen
    show: function (){
      //gør at kanterne af cirklerne ikke ser dumme ud.
      stroke(0)
      strokeWeight(0.2)
      fill(colors.c1)
      ellipse(this.x,this.y,this.d1)
    },
    showInner: function (){
      fill(colors.c2)
      ellipse(this.x,this.y,this.d2)
    }
  }

  globalInterval = setInterval(createCircle, 1000)
}

function draw(){
  background(50)
  //fjerner cursoren over player cirklen
  noCursor()
  //opdatere player cirklens position
  player.x = mouseX
  player.y = mouseY
 
  for(let i=0; i < circles.length; i++){
    //køre hver eneste cirkels funktioner
    circles[i].show()
    circles[i].big()

    //hvis en cirkel bliver for lille fjernes den
    if(circles[i].dia <0){
      circles.splice(i,1)
      lives -= 1
    }

    //hvis musen er over en cirkel og der trykkes vil cirklen fjernes
    let theCirk = circles[i]
    
    if(keyPressed()){
      if(within(theCirk)){
        circles.splice(i,1)
      }
      keyPressed()
    }
  }


  //viser player
  player.show()
  player.showInner()

  intervalCreator()
}

//interval ting
let interval = 2000
function intervalCreator(){
//når 15 sekunder er gået vil intervallet af createCircle forkortes 
 if(frameCount % 600==0){ 
  //fjerner oprindelige interval for at undgå overlap
  clearInterval(globalInterval)
  interval -= interval/5
  globalInterval = setInterval(createCircle, interval)
 }
}

let growSpeed = 1
let maxGrow = 100
function createCircle(){
 let circle = {
  x: random(100,windowWidth-100),
  y: random(100,windowHeight-100),
  dia: 1,
  max: false,
  show: function (){
    //laver cirklerne
    stroke(colors.c5)
    strokeWeight(5)
    fill(colors.c4)
    ellipse(this.x,this.y,this.dia)
  },
  big: function (){
    if(!this.max){
      //for cirklerne til at gro
      this.dia += growSpeed
      //hvis cirklen er større end maxGrow vil if statementet gå til else
      if(this.dia > maxGrow){
        this.max = true
      }
    } else {
      this.dia -= growSpeed
    }
  }
 }
 circles.push(circle)
}

//tjekker om musen er over en cirkel
function within(cirk){
  let cLeft = cirk.x - cirk.dia / 2
  let cRight = cirk.x + cirk.dia / 2
  let cTop = cirk.y - cirk.dia / 2
  let cBottom = cirk.y + cirk.dia / 2

  let mouseLeft = player.x - player.d1 / 4
  let mouseRight = player.x + player.d1 / 4
  let mouseTop = player.y - player.d1 / 4
  let mouseBottom = player.y + player.d1 / 4

  //udelukkelses metode
  let overlap = true
  if(
    //hvis bare en af de her ting er rigtige er der intet overlap
    //Player er til venstre for cirkel
    mouseRight < cLeft ||
    //Player er under cirkel
    mouseBottom < cTop ||
    //Player er under cirkel
    mouseTop > cBottom ||
    //Player er til højre for cirkel
    mouseLeft > cRight
  ){
     overlap = false 
  }
  //returner om der er overlap
  return overlap
}

//tjekker om keyboard knapperne er kilkket
function keyPressed(){
  if(key == "z" || key == "x"){
    return true
  }
}