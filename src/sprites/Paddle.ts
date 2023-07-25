import { Vector } from '../types'

export class Paddle {
  private PaddleImage: HTMLImageElement = new Image()
  private moveRight: boolean
  private moveLeft: boolean

  constructor(private speed: number, private PaddleWidth: number, private PaddleHeight: number, private Position: Vector, image: string) {
    this.speed = speed
    this.PaddleWidth = PaddleWidth
    this.PaddleHeight = PaddleHeight
    this.Position = Position
    this.moveRight = false
    this.moveLeft = false
    this.PaddleImage.src = image

    document.addEventListener('keydown', this.handleKeyDown)
    document.addEventListener('keyup', this.handleKeyUp)
  }

  get width(): number {
    return this.PaddleWidth
  }

  get height(): number {
    return this.PaddleHeight
  }

  get pos(): Vector {
    return this.Position
  }

  get image(): HTMLImageElement {
    return this.PaddleImage
  }

  get isMovingRight(): boolean {
    return this.moveRight
  }

  get isMovingLeft(): boolean {
    return this.moveLeft
  }

  movePaddle(): void {
    if (this.moveLeft) this.pos.x -= this.speed
    if (this.moveRight) this.pos.x += this.speed
  }

  handleKeyUp = (e: KeyboardEvent): void => {
    if (e.code === 'ArrowLeft' || e.key === 'ArrowLeft') this.moveLeft = false
    if (e.code === 'ArrowRight' || e.key === 'ArrowRight') this.moveRight = false
  }

  handleKeyDown = (e: KeyboardEvent): void => {
    if (e.code === 'ArrowLeft' || e.key === 'ArrowLeft') this.moveLeft = true
    if (e.code === 'ArrowRight' || e.key === 'ArrowRight') this.moveRight = true
  }
}
