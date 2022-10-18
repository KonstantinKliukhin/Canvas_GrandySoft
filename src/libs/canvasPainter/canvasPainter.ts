import {
  CanvasLineCapType,
  CanvasPainterType,
  CanvasStrokeStyleType,
} from '../../types/canvasPainter';

const CANVAS_PIXEL_SCALE_W = 2;
const CANVAS_PIXEL_SCALE_H = 2;

class CanvasPainter implements CanvasPainterType {
  private context: CanvasRenderingContext2D;
  private canvasElement: HTMLCanvasElement;

  constructor(
    width: number,
    height: number,
    canvas: HTMLCanvasElement,
    lineCap: CanvasLineCap,
    strokeStyle: CanvasStrokeStyleType,
    lineWidth: number,
  ) {
    canvas.width = width * CANVAS_PIXEL_SCALE_W;
    canvas.height = height * CANVAS_PIXEL_SCALE_H;

    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const context = canvas.getContext('2d');

    if (!context) {
      throw new Error(`incorrect context type ${typeof context}`);
    }

    context.scale(CANVAS_PIXEL_SCALE_W, CANVAS_PIXEL_SCALE_H);
    context.lineCap = lineCap;
    context.strokeStyle = strokeStyle;
    context.lineWidth = lineWidth;
    CanvasGradient;

    this.canvasElement = canvas;
    this.context = context;
    this.width = width;
    this.height = height;
    this.lineCap = lineCap;
    this.strokeStyle = strokeStyle;
    this.lineWidth = lineWidth;
  }

  setScale(x: number, y: number): void {
    this.context.scale(x, y);
  }

  moveTo(x: number, y: number): void {
    this.context.moveTo(x, y);
  }

  lineTo(x: number, y: number): void {
    this.context.lineTo(x, y);
  }

  stroke(): void {
    this.context.stroke();
  }

  beginPath(): void {
    this.context.beginPath();
  }

  closePath(): void {
    this.context.closePath();
  }

  clearRect(x: number, y: number, w: number, h: number): void {
    this.context.clearRect(x, y, w, h);
  }

  set width(value: number) {
    this.canvasElement.width = value;
  }

  get width(): number {
    return this.canvasElement.width;
  }

  set height(value: number) {
    this.canvasElement.height = value;
  }

  get height(): number {
    return this.canvasElement.height;
  }

  set lineCap(value: CanvasLineCapType) {
    this.context.lineCap = value;
  }

  get lineCap(): CanvasLineCapType {
    return this.context.lineCap;
  }

  set strokeStyle(value: CanvasStrokeStyleType) {
    this.context.strokeStyle = value;
  }

  get strokeStyle(): CanvasStrokeStyleType {
    return this.context.strokeStyle;
  }

  set lineWidth(value: number) {
    this.context.lineWidth = value;
  }

  get lineWidth(): number {
    return this.context.lineWidth;
  }
}

export default CanvasPainter;
