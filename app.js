const scoreDiv = document.getElementById('score')
let score = 0
scoreDiv.innerText = `Current score - ${score}`
const livesDiv = document.getElementById('lives')
let lives = ['*', '*', '*']
livesDiv.innerText = `Lives  - ${lives.join('')}`
const updateScore = (score, lives) => {
  scoreDiv.innerText = `Current score - ${score}`
  livesDiv.innerText = `Lives  - ${lives.join('')}`
}

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const ballRadius = 40;
const dartHeight = 70;
const dartWidth = 4;

let x = canvas.width / 2;
let y = canvas.height - 420;
let ballSpeedX = 3;

let dartSpeedY = -15;
let dartX = (canvas.width - dartWidth) / 2;
let dartY = (canvas.height - dartHeight)

const restart = () => {
  setTimeout(() => {
    ballSpeedX = ((Math.random() < 0.5) ? -1 : 1)*(Math.random() * (6-1) + 1)
    console.log('restarted');
    x = canvas.width / 2;
    y = canvas.height - 420;
    dartX = (canvas.width - dartWidth) / 2;
    dartY = (canvas.height - dartHeight)
    isMonitoringMouse = true
    isClicked = false
    isMoving = true
    // restart.disabled = true
    requestAnimationFrame(draw)
  }, 500);
}

let isMonitoringMouse = true
let isClicked = false
canvas.addEventListener('click', () => { 
  isClicked = true
  isMonitoringMouse = false
  canvas.classList.add('active')
  setTimeout(() => {
    canvas.classList.remove('active')
  }, 500)
})

let isMoving = true
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawDart();

  if (x + ballSpeedX > canvas.width - ballRadius || x + ballSpeedX < ballRadius) {
    ballSpeedX = -ballSpeedX;
  } else {
    x += ballSpeedX;
  }

  if (isClicked === true) {
    if (dartY > -95) {
      dartY += dartSpeedY
      
      if (dartY === 55) {
        if (dartX <= x + ballRadius && dartX >= x - ballRadius) {
          isClicked = false
          isMoving = false
          score += 1
          updateScore(score, lives)
          restart()
        }
      }
      if (dartY === -95) {
        isMoving = false
        isClicked = false
        if (lives[1]) {
          lives.splice(0,1)
          updateScore(score, lives)
          restart()
        } else {
          alert(`Your total score is --- ${score}\n\nPlease start a new game!`)
          start.disabled = false
        }
      }
    }
  }
  if (isMoving) {
    requestAnimationFrame(draw)
  }

}

function mouseMoveHandler(e) {
  if (isMonitoringMouse) {
    let relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
      dartX = relativeX - dartWidth / 2;
    }
  }
}
canvas.addEventListener("mousemove", mouseMoveHandler, false);


function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#BB8493";
  ctx.fill();
  ctx.closePath();
  ctx.beginPath();
  ctx.arc(x, y, 35, 0, Math.PI * 2);
  ctx.fillStyle = "#49243E";
  ctx.fill();
  ctx.closePath();
  ctx.beginPath();
  ctx.arc(x, y, 30, 0, Math.PI * 2);
  ctx.fillStyle = "#BB8493";
  ctx.fill();
  ctx.closePath();
  ctx.beginPath();
  ctx.arc(x, y, 25, 0, Math.PI * 2);
  ctx.fillStyle = "#49243E";
  ctx.fill();
  ctx.closePath();
  ctx.beginPath();
  ctx.arc(x, y, 20, 0, Math.PI * 2);
  ctx.fillStyle = "#BB8493";
  ctx.fill();
  ctx.closePath();
  ctx.beginPath();
  ctx.arc(x, y, 15, 0, Math.PI * 2);
  ctx.fillStyle = "#49243E";
  ctx.fill();
  ctx.closePath();
  ctx.beginPath();
  ctx.arc(x, y, 10, 0, Math.PI * 2);
  ctx.fillStyle = "#BB8493";
  ctx.fill();
  ctx.closePath();
}
function drawDart() {
  ctx.beginPath();
  ctx.rect(dartX, dartY, dartWidth, dartHeight);
  ctx.fillStyle = "#49243E";
  ctx.fill();
  ctx.closePath();
}
const start = document.getElementById("runButton")
start.addEventListener("click", function () {
  this.disabled = true;
  lives = ['*', '*', '*']
  score = 0
  updateScore(score, lives)
  restart();
  // restart.disabled = false;
});

