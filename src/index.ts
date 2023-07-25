import { Ball, Brick, Paddle } from './sprites'
import { CanvasView } from './view/CanvasView'
import { PADDLE_HEIGHT, PADDLE_SPEED, PADDLE_WIDTH, PADDLE_STARTX } from './setup'
import PADDLE_IMAGE from './images/paddle.png'

let result = 0
let isGameOver = false

const gameLoop = (
  paddle: Paddle,
  // ball: Ball,
  // bricks: Brick[],
  canvas: CanvasView,
): void => {
  canvas.drawSprite(paddle)
}
const startGame = (view: CanvasView): void => {
  const paddleStartPosition = { x: PADDLE_STARTX, y: view.canvas.height - PADDLE_HEIGHT - 5 }
  const paddle = new Paddle(PADDLE_SPEED, PADDLE_WIDTH, PADDLE_HEIGHT, paddleStartPosition, PADDLE_IMAGE)
  gameLoop(paddle, view)
}

const canvas = new CanvasView('#playField')
canvas.initStartButton(() => startGame(canvas))
