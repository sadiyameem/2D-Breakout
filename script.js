const grid = document.querySelector('.grid')
const scoreDisplay = document.querySelector('#score')
const blockWidth = 100
const blockHeight = 20
const boardWidth = 560
const boardHeight = 300

const useStart = [230, 10]
let currentPosition = userStart

const ballStart = [270, 40]
let ballCurrentPosition = ballStart

// add user
const user = document.createElement('div')
user.classList.add('user')
grid.appendChild(user)

//add ball
const ball = document.createElement('div')
ball.classList.add('ball')

// function
function drawUser() {
    user.style.left = currentPosition[0] + 'px'
    user.style.bottom = currentPosition[1] + 'px'
}