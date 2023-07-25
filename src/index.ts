import { Ball, Brick, Paddle } from './sprites'
import { CanvasView } from './view/CanvasView'
import { PADDLE_HEIGHT, PADDLE_SPEED, PADDLE_WIDTH, PADDLE_STARTX, BALL_SPEED, BALL_SIZE, BALL_STARTX, BALL_STARTY } from './setup'
import PADDLE_IMAGE from './images/paddle.png'
import BALL_IMAGE from './images/ball.png'

let result = 0
let isGameOver = false

const gameLoop = (
  paddle: Paddle,
  ball: Ball,
  // bricks: Brick[],
  canvas: CanvasView,
): void => {
  canvas.drawSprite(paddle)
  canvas.drawSprite(ball)
}
const startGame = (view: CanvasView): void => {
  const paddleStartPosition = { x: PADDLE_STARTX, y: view.canvas.height - PADDLE_HEIGHT - 5 }
  const paddle = new Paddle(PADDLE_SPEED, PADDLE_WIDTH, PADDLE_HEIGHT, paddleStartPosition, PADDLE_IMAGE)
  const ballStartPosition = { x: BALL_STARTX, y: BALL_STARTY }
  const ball = new Ball(BALL_SPEED, BALL_SIZE, ballStartPosition, BALL_IMAGE)
  view.drawScore(result)
  gameLoop(paddle, ball, view)
}

const canvas = new CanvasView('#playField')
canvas.initStartButton(() => startGame(canvas))
