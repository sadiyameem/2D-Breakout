const grid = document.querySelector('.grid')
const scoreDisplay = document.querySelector('#score')
const blockWidth = 100
const blockHeight = 20
const boardWidth = 560
const boardHeight = 300

const userStart = [230, 10]
let currentPosition = userStart

const ballStart = [270, 40]
let ballCurrentPosition = ballStart

// my block
class Block {
    constructor(_xAxis, _yAxis) {
        this.bottomLeft = [_xAxis, _yAxis]
        this.bottomRight = [_xAxis + blockWidth, _yAxis]
        this.topRight = [_xAxis, _yAxis + blockHeight]
        this.topLeft = [_xAxis, _yAxis + blockHeight]
    }
}

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