import { Ball, Brick, Paddle } from './sprites'
import { CanvasView } from './view/CanvasView'
import { PADDLE_HEIGHT, PADDLE_SPEED, PADDLE_WIDTH, PADDLE_STARTX, BALL_SPEED, BALL_SIZE, BALL_STARTX, BALL_STARTY } from './setup'
import PADDLE_IMAGE from './images/paddle.png'
import BALL_IMAGE from './images/ball.png'
import { createBricks } from './helpers'
import { Collison } from './Collison'

let score = 0
let isGameOver = false

const gameLoop = (paddle: Paddle, ball: Ball, bricks: Brick[], canvas: CanvasView, collison: Collison): void => {
  canvas.clear()
  canvas.drawSprite(paddle)
  canvas.drawSprite(ball)
  canvas.drawBricks(bricks)
  collison.isCollidingBall(ball, paddle, canvas)
  collison.isCollidingBricks(ball, bricks)
  ball.moveBall()
  window.requestAnimationFrame(() => gameLoop(paddle, ball, bricks, canvas, collison))
}

const startGame = (view: CanvasView): void => {
  const paddleStartPosition = { x: PADDLE_STARTX, y: view.canvas.height - PADDLE_HEIGHT - 5 }
  const collison = new Collison()
  const paddle = new Paddle(PADDLE_SPEED, PADDLE_WIDTH, PADDLE_HEIGHT, paddleStartPosition, PADDLE_IMAGE)
  const ballStartPosition = { x: BALL_STARTX, y: BALL_STARTY }
  const ball = new Ball(BALL_SPEED, BALL_SIZE, ballStartPosition, BALL_IMAGE)
  const bricks = createBricks()
  view.drawScore(score)
  gameLoop(paddle, ball, bricks, view, collison)
}

const canvas = new CanvasView('#playField')
canvas.initStartButton(() => startGame(canvas))
