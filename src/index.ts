import { Ball, Brick, Paddle } from './sprites'
import { CanvasView } from './view/CanvasView'
import { PADDLE_HEIGHT, PADDLE_SPEED, PADDLE_WIDTH, PADDLE_STARTX, BALL_SPEED, BALL_SIZE, BALL_STARTX, BALL_STARTY } from './setup'
import PADDLE_IMAGE from './images/paddle.png'
import BALL_IMAGE from './images/ball.png'
import { createBricks } from './helpers'
import { Collision } from './Collision'

let score = 0

const gameLoop = (paddle: Paddle, ball: Ball, bricks: Brick[], canvas: CanvasView, collision: Collision): void => {
  const canvasEl = canvas.canvas
  canvas.clear()
  canvas.drawSprite(paddle)
  canvas.drawSprite(ball)
  canvas.drawBricks(bricks)
  collision.isCollidingBall(ball, paddle, canvas)

  if (collision.isCollidingBricks(ball, bricks)) {
    score += 1
    canvas.drawScore(score)
  }

  if ((paddle.isMovingLeft && paddle.pos.x > 0) || (paddle.isMovingRight && paddle.pos.x < canvasEl.width - paddle.width)) {
    paddle.movePaddle()
  }
  ball.moveBall()

  if (bricks.length === 0 || ball.pos.y > canvasEl.height) return canvas.drawInfo('Game Over')

  if (bricks.length === 0) return canvas.drawInfo('Game Won!')

  window.requestAnimationFrame(() => gameLoop(paddle, ball, bricks, canvas, collision))
}

const startGame = (view: CanvasView): void => {
  score = 0
  view.drawInfo('')
  view.drawScore(score)

  const paddleStartPosition = { x: PADDLE_STARTX, y: view.canvas.height - PADDLE_HEIGHT - 5 }
  const collision = new Collision()
  const paddle = new Paddle(PADDLE_SPEED, PADDLE_WIDTH, PADDLE_HEIGHT, paddleStartPosition, PADDLE_IMAGE)
  const ballStartPosition = { x: BALL_STARTX, y: BALL_STARTY }
  const ball = new Ball(BALL_SPEED, BALL_SIZE, ballStartPosition, BALL_IMAGE)
  const bricks = createBricks()
  gameLoop(paddle, ball, bricks, view, collision)
}

const canvas = new CanvasView('#playField')
canvas.initStartButton(() => startGame(canvas))
