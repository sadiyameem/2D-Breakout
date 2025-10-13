const grid = document.querySelector('.grid')
const scoreDisplay = document.querySelector('#score')
const startBtn = document.querySelector('#start-btn')
const blockWidth = 100
const blockHeight = 20
const ballDiameter = 20
const boardWidth = 560
const boardHeight = 300
let xDirection = -2
let yDirection = 2

let timerId
let score = 0

const userStart = [230, 10]
let currentPosition = userStart

const ballStart = [270, 40]
let ballCurrentPosition = ballStart

// my block
class Block {
    constructor(_xAxis, _yAxis) {
        this.bottomLeft = [_xAxis, _yAxis]
        this.bottomRight = [_xAxis + blockWidth, _yAxis]
        this.topRight = [_xAxis + blockWidth, _yAxis + blockHeight]
        this.topLeft = [_xAxis, _yAxis + blockHeight]
    }
}

// all my blocks
const blocks = [
    new Block(10, 270),
    new Block(120, 270),
    new Block(230, 270),
    new Block(340, 270),
    new Block(450, 270),
    new Block(10, 240),
    new Block(120, 240),
    new Block(230, 240),
    new Block(340, 240),
    new Block(450, 240),
    new Block(10, 210),
    new Block(120, 210),
    new Block(230, 210),
    new Block(340, 210),
    new Block(450, 210),
]

// draw my blocks
function addBlocks() {
  for (let i = 0; i < blocks.length; i++) {
    const block = document.createElement('div')
    block.classList.add('block')
    block.style.left = blocks[i].bottomLeft[0] + 'px'
    block.style.bottom = blocks[i].bottomLeft[1] + 'px'
    grid.appendChild(block)
  }
}
addBlocks()


// add user
const user = document.createElement('div')
user.classList.add('user')
grid.appendChild(user)
drawUser()

//add ball
const ball = document.createElement('div')
ball.classList.add('ball')
grid.appendChild(ball)
drawBall()

// function of user
function drawUser() {
    user.style.left = currentPosition[0] + 'px'
    user.style.bottom = currentPosition[1] + 'px'
}

// function of ball
function drawBall() {
    ball.style.left = ballCurrentPosition[0] + 'px'
    ball.style.bottom = ballCurrentPosition[1] + 'px'
}

// move user
function moveUser(e) {
    switch(e.key) {
        case 'ArrowLeft':
            if (currentPosition[0] > 0) {
                currentPosition[0] -= 10
                drawUser()
            }
            break
            case 'ArrowRight':
                if ((currentPosition[0] < boardWidth - blockWidth)) {
                    currentPosition[0] += 10
                    drawUser()
                }
                break
    }
}
document.addEventListener('keydown', moveUser)

//move ball
function moveBall() {
    ballCurrentPosition[0] += xDirection
    ballCurrentPosition[1] += yDirection
    drawBall()
    checkForCollision()
}

// check for collision
function checkForCollision() {
    //check for block collision
    for (let i = 0; i < blocks.length; i++) {
        if (ballCurrentPosition[0] > blocks[i].bottomLeft[0] &&
            ballCurrentPosition[0] < blocks[i].bottomRight[0] &&
            (ballCurrentPosition[1] + ballDiameter) > blocks[i].bottomLeft[1] &&
            ballCurrentPosition[1] < blocks[i].topLeft[1]
        ) {
            const allBlocks = document.querySelectorAll('.block')
            allBlocks[i].classList.remove('block')
            blocks.splice(i, 1)
            score++
            scoreDisplay.innerHTML = score
            if (blocks.length == 0) {
                scoreDisplay.innerHTML = 'You Win!'
                clearInterval(timerId)
                document.removeEventListener('keydown', moveUser)
            }
        }
    }
    // check for wall hits
    if (ballCurrentPosition[0] >= (boardWidth - ballDiameter) ||
        ballCurrentPosition[0] <= 0 ||
        ballCurrentPosition[1] >= (boardHeight - ballDiameter)
) {
    changeDirection()
}

//check for user collision
if (
    ballCurrentPosition[0] > currentPosition[0] &&
    ballCurrentPosition[0] < currentPosition[0] + blockWidth &&
    (ballCurrentPosition[1] > currentPosition[1] && ballCurrentPosition[1] < currentPosition[1] + blockHeight)
) {
    changeDirection()
}

//game over
if (ballCurrentPosition[1] <= 0) {
    clearInterval(timerId)
    scoreDisplay.innerHTML = 'You Lose!'
    document.removeEventListener('keydown', moveUser)
}
}

// adding change direction
function changeDirection() {
    if (xDirection == 2 && yDirection === 2) {
        yDirection = -2
        return
    }
    if (xDirection == 2 && yDirection === -2) {
        xDirection = -2
        return
    }
    if (xDirection == -2 && yDirection === -2) {
        yDirection = 2
        return
    }
    if (xDirection == -2 && yDirection === 2) {
        xDirection = 2
        return
    }
}

// start button
startBtn.addEventListener('click', () => {
    clearInterval(timerId)
    resetGame()
    timerId = setInterval(moveBall, 30)
    startBtn.textContent = 'Restart Game'
})